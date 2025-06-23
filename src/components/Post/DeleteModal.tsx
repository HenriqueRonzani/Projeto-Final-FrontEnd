import React from "react";
import Button from "@/components/Form/Button";
import {deletePost} from "@/services/postService";
import Modal from "@/components/Modal/Modal";
import {useRouter} from "next/navigation";
import {handleRequestError, handleRequestSuccess} from "@/lib/toast";

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
    try {
      await deletePost(postId);
      handleRequestSuccess('Post excluído com sucesso!');
      onClose();
      router.refresh();
    } catch (error) {
      handleRequestError(error);
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col gap-5 p-5 items-center bg-white dark:bg-slate-900'>
        <span className='text-gray-900 dark:text-white'>Você tem certeza que deseja excluir este post?</span>
        <div className={'flex flex-row gap-2'}>
          <Button className='px-5' onClick={handleDelete}>Excluir</Button>
          <Button className='px-5' onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
}
