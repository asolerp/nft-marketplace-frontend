import React from 'react'

type Props = {
  active: boolean
  name: string
  onPress: () => void
}

const Filter: React.FC<Props> = ({ active = false, name, onPress }) => {
  const defaultClass =
    'rounded-3xl py-2 px-4 hover:text-slate-700 hover:bg-amber-300 pointer-cursor'
  const activeClass =
    'ring-2 ring-white bg-amber-300 text-slate-700 ' + defaultClass
  const inactiveClass =
    'ring-2 ring-amber-300 py-2 px-4 text-white ' + defaultClass

  return (
    <div className={active ? activeClass : inactiveClass} onClick={onPress}>
      <span className="font-bold">{name}</span>
    </div>
  )
}

export default Filter
