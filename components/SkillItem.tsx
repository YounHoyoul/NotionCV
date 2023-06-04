"use client"

import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

type Props = SkillResultSet;

export default function SkillItem({ name, projects, workingPeriod }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full mt-4 relative ${open ? "rounded border bg-white" : ''}`}>
      <span className="absolute top-5 right-2">
        {open ? <FaChevronRight className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </span>
      <h2 className={`text-md w-full px-2 pr-20 py-4 cursor-pointer ${open ? 'border-b-[1px] border-slate-400' : ''}`}
        onClick={() => open ? setOpen(false) : setOpen(true)}>
        {name}
        <span className="text-xs font-normal"> · {workingPeriod}</span>
      </h2>
      <ul className={`list-disc pl-4 py-2 my-4 ${open ? '' : 'hidden'}`}>
        {projects.map((item, index) => <li className="text-sm" key={index}>
          {item.name[0].plain_text}
          <span className="text-xs"> · {item.totalMonths} mos</span>
        </li>)}
      </ul>
    </div>
  )
}
