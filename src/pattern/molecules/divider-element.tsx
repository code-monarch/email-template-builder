import type React from "react"

interface DividerElementProps {
  content: any
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const DividerElement: React.FC<DividerElementProps> = ({ styles }) => {
  return <hr style={styles} />
}
