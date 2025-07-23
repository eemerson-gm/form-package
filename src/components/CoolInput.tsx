import { Input } from "antd"
import { Controller } from "../contexts/Controller";

export const CoolInput = () => {
  return (
    <>
      <Controller name="test" defaultValue="default" render={({ field }) => <Input {...field} />} />
    </>
  )
}