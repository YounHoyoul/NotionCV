import clsx from "clsx";
import Anchor from "./Anchor";

type Props = {
  text: NotionText[],
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl",
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | undefined,
  children?: React.ReactNode
};

class TextDecorator {
  constructor(readonly fontSize?: string, readonly fontWeight?: string, readonly next?: TextDecorator) { }
  draw(item: NotionText, index: number): React.ReactNode {
    throw new Error('draw is not implemented');
  }
  parseClassname(item: NotionText) {
    return clsx(
      this.fontSize,
      this.fontWeight,
      !this.fontWeight && item.annotations.bold && "font-semibold",
      item.annotations.italic && "italic",
      item.annotations.color === 'gray' && "text-gray-600 dark:text-gray-300",
      item.annotations.color === 'default' && "text-slate-600 dark:text-slate-300",
      item.annotations.color === 'green' && "text-green-600 dark:text-green-300",
      item.annotations.color === 'red' && "text-red-600 dark:text-red-300",
      item.annotations.color === 'blue' && "text-blue-600 dark:text-blue-300",
      item.annotations.color === 'brown' && "text-amber-600 dark:text-amber-300",
      item.annotations.color === 'purple' && "text-purple-600 dark:text-purple-300",
      item.annotations.color === 'orange' && "text-orange-600 dark:text-orange-300",
      item.annotations.color === 'yellow' && "text-yellow-600 dark:text-yellow-300",
      item.annotations.color === 'pink' && "text-pink-600 dark:text-pink-300",
    );
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
      ? <Anchor link={item.href!} className="">{this.next.draw(item, index)}</Anchor>
      : <Anchor key={index} link={item.href!} className={this.parseClassname(item)}>{item.text.content}</Anchor>
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
  const fontSizeClassName = `text-${fontSize ?? 'sm'}`;
  const fontWeightClassName = fontWeight ? `font-${fontWeight}` : '';

  return (
    <p>
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
