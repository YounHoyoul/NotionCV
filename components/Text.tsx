type Props = {
  text: NotionText[],
  children?: React.ReactNode
};

class TextDecorator {
  constructor(readonly next?: TextDecorator) { }
  draw(item: NotionText, index: number): React.ReactNode {
    throw new Error('draw is not implemented');
  }
  parseClassname(item: NotionText) {
    return [
      item.annotations.bold ? "font-bold" : '',
      item.annotations.italic ? "italic" : '',
      item.annotations.color === 'gray' ? "text-gray-600 dark:text-gray-300" : ''
    ].join(' ').trim()
  };
}

class UnderlineDecorator extends TextDecorator {
  draw(item: NotionText, index: number) {
    return this.next
      ? <u>{this.next.draw(item, index)}</u>
      : <u key={index} className={this.parseClassname(item)}>{item.text.content}</u>
  }
}

class StrikethroughDecorator extends TextDecorator {
  draw(item: NotionText, index: number) {
    return this.next
      ? <s>{this.next.draw(item, index)}</s>
      : <s key={index} className={this.parseClassname(item)}>{item.text.content}</s>
  }
}

class CodeDecorator extends TextDecorator {
  draw(item: NotionText, index: number) {
    return this.next
      ? <code>{this.next.draw(item, index)}</code>
      : <code key={index} className={this.parseClassname(item)}>{item.text.content}</code>
  }
}

class AnchorDecorator extends TextDecorator {
  draw(item: NotionText, index: number) {
    return this.next
      ? <a href={item.href}>{this.next.draw(item, index)}</a>
      : <a key={index} className={this.parseClassname(item)} href={item.href}>{item.text.content}</a>
  }
}

class SpanDecorator extends TextDecorator {
  draw(item: NotionText, index: number) {
    return this.next
      ? <span>{this.next.draw(item, index)}</span>
      : <span key={index} className={this.parseClassname(item)}>{item.text.content}</span>
  }
}

export default function Text({ text, children }: Props) {
  return (
    <p className="text-sm py-2 antialiased">
      {text.map((item, index) => {
        let decorator = item.href ? new AnchorDecorator() : new SpanDecorator();
        decorator = item.annotations.code ? new CodeDecorator(decorator) : decorator;
        decorator = item.annotations.underline ? new UnderlineDecorator(decorator) : decorator;
        decorator = item.annotations.strikethrough ? new StrikethroughDecorator(decorator) : decorator;

        return decorator.draw(item, index);
      })}
      {children}
    </p>
  )
}
