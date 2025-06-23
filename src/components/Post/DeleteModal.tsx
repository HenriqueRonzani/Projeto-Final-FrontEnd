import React from "react";
import Button from "@/components/Form/Button";
import {deletePost} from "@/services/postService";
import Modal from "@/components/Modal/Modal";
import {useRouter} from "next/navigation";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

export default function DeletePostModal({isOpen, onClose, postId}: DeletePostModalProps) {
  const router = useRouter();
  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    await deletePost(postId);
    onClose();
    router.refresh();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col gap-5 p-5 items-center bg-white dark:bg-surface'>
        <span className='text-gray-900 dark:text-white'>Você tem certeza que deseja excluir este post?</span>
        <div className={'flex flex-row gap-2'}>
          <Button className='px-5' onClick={handleDelete}>Excluir</Button>
          <Button className='px-5' onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
}
