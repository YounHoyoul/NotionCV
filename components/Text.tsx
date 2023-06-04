type Props = {
  text: NotionText[],
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl",
  fontWeight?: boolean,
  children?: React.ReactNode
};

class TextDecorator {
  constructor(readonly fontSize?: string, readonly fontWeight?: string, readonly next?: TextDecorator) { }
  draw(item: NotionText, index: number): React.ReactNode {
    throw new Error('draw is not implemented');
  }
  parseClassname(item: NotionText) {
    return [
      this.fontSize,
      this.fontWeight,
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

export default function Text({ text, fontSize, fontWeight, children }: Props) {
  const fontSizeVariables = {
    "xs": "text-xs",
    "sm": "text-sm",
    "md": "text-md",
    "lg": "text-lg",
    "xl": "text-xl",
  };

  let fontSizeClassName = "sm";
  let fontWeightClassName = "";

  if (fontSize) fontSizeClassName = fontSizeVariables[fontSize];
  if (fontWeight === true) fontWeightClassName = "font-bold";

  return (
    <p className={`py-2`}>
      {text.map((item, index) => {
        let decorator = item.href ? new AnchorDecorator(fontSizeClassName, fontWeightClassName) : new SpanDecorator(fontSizeClassName, fontWeightClassName);
        decorator = item.annotations.code ? new CodeDecorator(fontSizeClassName, fontWeightClassName, decorator) : decorator;
        decorator = item.annotations.underline ? new UnderlineDecorator(fontSizeClassName, fontWeightClassName, decorator) : decorator;
        decorator = item.annotations.strikethrough ? new StrikethroughDecorator(fontSizeClassName, fontWeightClassName, decorator) : decorator;

        return decorator.draw(item, index);
      })}
      {children}
    </p>
  )
}
