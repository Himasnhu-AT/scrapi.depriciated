import { GlobalVarsService } from '@app/global';
import { Injectable } from '@nestjs/common';
import { FetchScrapperService } from './scrappers/axios.scrapper';
import * as cheerio from 'cheerio';
import * as TurndownService from 'turndown';
import { excludeNonMainTags } from '@app/global/excludedTags';
import { FetchURLOptions } from '@scrapi/common';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), './.env') });

@Injectable()
export class FetchService {
  private turndownService: TurndownService;
  private isTestEnvironment: boolean;

  constructor(
    private readonly globalVarsService: GlobalVarsService,
    private readonly fetchScrapperService: FetchScrapperService,
  ) {
    // Initialize TurndownService with custom configuration
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
    });

    // Check environment with fallback
    this.isTestEnvironment = process.env.NODE_ENV === 'test' || false;
    if (this.isTestEnvironment) {
      console.log('Running in test environment');
    }
    if (this.isTestEnvironment == undefined || this.isTestEnvironment == null) {
      throw new Error('ERROR in processing env @.../fetch.service.ts');
    }

    // Custom rules for better markdown formatting
    this.configureTurndownRules();
  }

  private configureTurndownRules() {
    // Enhanced code block handling
    this.turndownService.addRule('fencedCodeBlock', {
      filter: (node) => {
        return (
          node.nodeName === 'PRE' ||
          (node.nodeName === 'CODE' && node.parentNode.nodeName !== 'PRE')
        );
      },
      replacement: (content, node) => {
        const element = node as Element;
        let language =
          element.getAttribute('class')?.replace(/^language-/, '') || '';
        language = language.split(' ')[0]; // Take only the first class as language
        const cleanedContent = this.cleanCodeContent(content);
        return `\n\`\`\`${language}\n${cleanedContent}\n\`\`\`\n`;
      },
    });

    // Better heading handling
    this.turndownService.addRule('headings', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: (content, node) => {
        const level = Number(node.nodeName.charAt(1));
        const prefix = '#'.repeat(level);
        const cleanContent = this.cleanHeadingContent(content);
        return `\n${prefix} ${cleanContent}\n`;
      },
    });

    // Improved link handling
    this.turndownService.addRule('links', {
      filter: 'a',
      replacement: (content, node) => {
        const element = node as Element;
        const href = element.getAttribute('href');
        if (!href || href.startsWith('javascript:')) return content;
        const title = element.getAttribute('title');
        const cleanContent = this.cleanLinkContent(content);
        return title
          ? `[${cleanContent}](${href} "${title}")`
          : `[${cleanContent}](${href})`;
      },
    });

    // Better list handling
    this.turndownService.addRule('list', {
      filter: ['ul', 'ol'],
      replacement: (content, node) => {
        const parent = node.parentNode;
        const isNestedList =
          parent && (parent.nodeName === 'UL' || parent.nodeName === 'OL');
        return `${isNestedList ? '\n' : '\n\n'}${content.trim()}\n${isNestedList ? '' : '\n'}`;
      },
    });
  }

  private cleanCodeContent(content: string): string {
    return content
      .replace(/\u200B/g, '') // Remove zero-width spaces
      .replace(/\s+$/gm, '') // Remove trailing whitespace
      .replace(/^\s+/gm, '') // Remove leading whitespace
      .trim();
  }

  private cleanHeadingContent(content: string): string {
    return content
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[#*`]/g, '')
      .trim();
  }

  private cleanLinkContent(content: string): string {
    return content
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanupHtml($: cheerio.CheerioAPI) {
    // Remove script tags and their content
    $('script').remove();

    // Remove style tags and their content
    $('style').remove();

    // Remove all inline styles
    $('[style]').removeAttr('style');
    // Remove data attributes
    $('*').each((_, elem) => {
      const attribs = (elem as any).attribs || {};
      Object.keys(attribs)
        .filter((attr) => attr.startsWith('data-'))
        .forEach((attr) => $(elem).removeAttr(attr));
    });

    // Remove common tracking and non-content elements
    excludeNonMainTags.forEach((selector) => {
      $(selector).remove();
    });

    // Remove empty paragraphs and divs
    $('p:empty, div:empty').remove();

    // Clean up whitespace
    $('*').each((_, elem) => {
      if (elem.type === 'text') {
        elem.data = elem.data.replace(/\s+/g, ' ').trim();
      }
    });

    // Preserve code block formatting
    $('pre code').each((_, elem) => {
      const code = $(elem).html();
      $(elem).text(code);
    });
  }

  private postProcessMarkdown(markdown: string): string {
    return (
      markdown
        // Fix heading spacing
        .replace(/\n(#+\s)/g, '\n\n$1')
        .replace(/(\n#+\s.*)\n(#+\s)/g, '$1\n\n$2')

        // Fix code block formatting
        .replace(/```\s+/g, '```\n')
        .replace(/\n+```/g, '\n```')

        // Fix list formatting
        .replace(/\n\s*(-|\d+\.)\s+/g, '\n$1 ')

        // Remove excessive blank lines
        .replace(/\n{3,}/g, '\n\n')

        // Fix inline code spacing
        .replace(/`\s+/g, '`')
        .replace(/\s+`/g, '`')

        // Clean up HTML comments
        .replace(/<!--[\s\S]*?-->/g, '')

        // Remove trailing whitespace
        .replace(/[ \t]+$/gm, '')

        .trim()
    );
  }

  private async saveMdToTemp(url: string, markdown: string) {
    if (!this.isTestEnvironment) return;

    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const sanitizedUrl = url
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();

    const filename = path.join(tempDir, `${sanitizedUrl}_${Date.now()}.md`);

    try {
      await fs.promises.writeFile(filename, markdown, 'utf8');
      console.log(`Test output saved to: ${filename}`);
    } catch (error) {
      console.error('Error saving markdown file:', error);
    }
  }

  async FetchURL({
    url,
    scrapper = 'axios',
    options,
  }: {
    url: string;
    scrapper: 'axios';
    options?: FetchURLOptions;
  }) {
    const pageOptions = options ?? this.globalVarsService.pageOptions();

    switch (scrapper) {
      case 'axios':
        const output = await this.fetchScrapperService.fetchURLWithAxios(
          url,
          pageOptions.universalTimeout,
          pageOptions.allowed_content_types,
          pageOptions.allowed_status_codes,
        );

        const $ = cheerio.load(output.content);
        this.cleanupHtml($);
        const markdownContent = this.turndownService.turndown($.html());
        const cleanedMarkdown = this.postProcessMarkdown(markdownContent);

        // Save to temp file if in test environment
        await this.saveMdToTemp(url, cleanedMarkdown);

        return {
          ...output,
          content: cleanedMarkdown,
        };
    }
  }

  // private cleanupHtml($: cheerio.CheerioAPI) {
  //   // Remove excluded tags
  //   excludeNonMainTags.forEach((selector) => {
  //     $(selector).remove();
  //   });

  //   // Remove style tags and inline styles
  //   $('style').remove();
  //   $('[style]').removeAttr('style');

  //   // Preserve whitespace in code blocks
  //   $('pre code').each((_, elem) => {
  //     const code = $(elem).html();
  //     $(elem).text(code);
  //   });

  //   // Remove empty paragraphs
  //   $('p:empty').remove();

  //   // Clean up excessive whitespace
  //   $('*').each((_, elem) => {
  //     if (elem.type === 'text') {
  //       elem.data = elem.data.replace(/\s+/g, ' ').trim();
  //     }
  //   });
  // }

  // private postProcessMarkdown(markdown: string): string {
  //   return markdown
  //     .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
  //     .replace(/\s+```/g, '\n```') // Fix code block formatting
  //     .replace(/```\n\n/g, '```\n') // Fix code block spacing
  //     .replace(/\n\n\n/g, '\n\n') // Normalize paragraph spacing
  //     .trim();
  // }
}
