import {Post} from "@/types";

export default function PostComponent(Post: Post) {
    return (
        // TODO: Adicionar mais dados do usuário ao componente post
        <div className={'p-10 flex flex-col gap-5'}>
            <div className={'flex flex-row gap-2 m-1'}>
                <span className={'text-4xl'}>{Post.title}</span>
                <span className={'text-xs ml-auto mt-auto text-slate-500'}>
                    {/*Adicionar mais dados aqui*/}
                    Publicado por: {Post.userId}
                </span>
            </div>
            <div className={'w-full p-5 mx-2 bg-slate-900 rounded-2xl'}>
                <p>{Post.content}</p>
            </div>
        </div>
    );
}
