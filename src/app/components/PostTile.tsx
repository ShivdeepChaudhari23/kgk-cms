import { MdDelete, MdModeEditOutline, MdOutlineTurnRight } from "react-icons/md";

import { Post } from "app/types/Post";

interface IPostTileProps {
    post: Post
    redirectToPost: (slug: string) => void,
    handleEditClick: (post: Post) => void,
    handleClickDelete: (id: number) => void,
}

const PostTile = ({post, redirectToPost, handleEditClick, handleClickDelete}: IPostTileProps) => {
    const { id, title, slug } = post;

    return (
        <div
          className=" px-4 group border-solid border-black border-[1px] rounded-md shadow-sm hover:shadow-lg m-2 hover:bg-blue-200 flex justify-between items-center"
          onClick={() => redirectToPost(slug)}
        >
          <p>{title}</p>
          <div className="flex">
            <MdModeEditOutline
              className="hover:text-blue-400 group-hover:block hidden"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(post);
              }}
            />
            <MdDelete
              className="hover:text-blue-400 group-hover:block hidden"
              onClick={(e) =>  {
                e.stopPropagation();
                handleClickDelete(id)
              }}
            />
            <MdOutlineTurnRight
              className="hover:text-blue-400 group-hover:block hidden"
              onClick={(e) => {
                e.stopPropagation();
                redirectToPost(slug);
              }}
            />
          </div>
        </div>
    );
}

export default PostTile;
