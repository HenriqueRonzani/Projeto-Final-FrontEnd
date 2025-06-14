'use client'

import {useRouter} from "next/navigation";
import Button from "@/components/Form/Button";

export default function NewPostButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/posts/new');
  };
  return (
    <Button className={'p-10 max-w-fit cursor-pointer'} onClick={handleClick}>+ Novo Post</Button>
  )
}
