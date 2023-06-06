"use client"

import { MouseEvent, useEffect, useState } from 'react';
import SelectItem from './SelectItem';
import Caret from './Caret';
import slugify from 'slugify';
import clsx from 'clsx';
import Anchor from './Anchor';
import { stopPropagation } from '@/lib/stopPropagation';

type Props = {
  id: string,
  item: SkillResultSet
};

export default function SkillItem({ id, item }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('click', () => setOpen(false));
  }, []);

  const handleClicked = (e: MouseEvent<HTMLSpanElement>) => {
    stopPropagation(e);
    setOpen(!open);
  }

  return (
    <div id={id} onClick={(e) => stopPropagation(e)} className={clsx(
      'w-full relative',
      open && clsx("rounded", "border", "bg-white", "dark:bg-gray-800", "dark:border-0")
    )}>
      <Caret open={open} onClick={handleClicked} />
      <h2 className={clsx("text-md w-full p-4 pr-20", open && "border-b-[1px] border-slate-400")}>
        <SelectItem item={item.item} />
        <span className="text-xs font-normal"> · {item.workingPeriod}</span>
        <span className="text-xs font-normal"> · {item.projects.length} pjts</span>
      </h2>
      <ul className={clsx("list-disc pl-8 pr-4 py-1 my-2", !open && "hidden")}>
        {item.projects.map((item, index) => <li className="text-sm py-1" key={index}>
          <Anchor link={`#${slugify(item.name[0].plain_text)}`} onClick={handleClicked}>
            {item.name[0].plain_text}
            <span className="text-xs"> · {item.totalMonths} mos</span>
          </Anchor>
        </li>)}
      </ul>
    </div>
  )
}
