"use client"

import { useState } from 'react';
import SelectItem from './SelectItem';
import Caret from './Caret';

type Props = {
  item: SkillResultSet
};

export default function SkillItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full relative ${open ? "rounded border bg-white dark:bg-gray-800 dark:border-0" : ''}`} onMouseLeave={() => setOpen(false)}>
      <Caret open={open} />
      <h2 className={`text-md w-full px-2 pr-20 py-4 cursor-pointer ${open ? 'border-b-[1px] border-slate-400' : ''}`}
        onClick={() => open ? setOpen(false) : setOpen(true)}>
        <SelectItem item={item.item} />
        <span className="text-xs font-normal"> · {item.workingPeriod}</span>
        <span className="text-xs font-normal"> · {item.projects.length} pjts</span>
      </h2>
      <ul className={`list-disc pl-4 py-2 my-4 ${open ? '' : 'hidden'}`}>
        {item.projects.map((item, index) => <li className="text-sm" key={index}>
          {item.name[0].plain_text}
          <span className="text-xs"> · {item.totalMonths} mos</span>
        </li>)}
      </ul>
    </div>
  )
}
