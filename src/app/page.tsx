"use client"

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import slugify from "slugify";
import axios, { AxiosResponse } from "axios";
import ReactQuill from "react-quill-new";

import { pluginManager } from "./plugins/PluginManager";
import VideoEmbedPlugin from "./plugins/VideoEmbedPlugin";
import PostTile from "./components/PostTile";
import { Post, PostConfiguration, postDefaultConfig } from "./types/Post";

import 'react-quill-new/dist/quill.snow.css';
import { messages } from './utils/constants';

pluginManager.register(VideoEmbedPlugin);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009/content";

export const pluginButton = <span className="ql-format"><button className="ql-blockquote" id="video-embed">Video</button></span>;

export default function Home() {
  const router = useRouter();
  let quillRef = useRef<ReactQuill | null>(null);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [selectedPostData, setSelectedPostData] = useState<PostConfiguration>(postDefaultConfig);
  const [postData, setPostData] = useState<PostConfiguration>(postDefaultConfig);

  const redirectToPost = (slug: string) => {
    router.push(`/post/${slug}`);
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${API_URL}`) as AxiosResponse;
        if (response.status === 200 && response.data.data && response.data.data.length > 0) {
          setPostsList(response.data.data);
        } else {
          setPostsList([]);
        }
      } catch (e) {
        console.log("#### ERROR FETCHING LIST : %o", e)
      }
    }());
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      pluginManager.applyPlugins(editor);
    }
  }, []);

  const shouldDisableButton = useMemo(() => {
    const { slug: currentSlug, content: currentContent, title: currentTitle } = postData;
    if (!(currentSlug && currentContent && currentTitle)) return true;
    const { slug: originalSlug, content: originalContent, title: originalTitle } = selectedPostData;
    const isSlugChanged = currentSlug !== originalSlug;
    const isTitleChanged = currentTitle !== originalTitle;
    const isContentChanged = currentContent !== originalContent;
    return postData.id > 0 && !(isSlugChanged || isTitleChanged || isContentChanged);
  }, [postData]);


  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ align: [] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      ['blockquote', 'code-block'],
    ],
  };

  const handleDataChange = (value: string, key: string) => {
    setPostData((prev) => {
      let payload = prev;
      // Auto Generate slug based on title
      if (key === 'title') {
        const slugByTitle = slugify(value, { lower: true });
        payload = { ...payload, slug: slugByTitle };
      }
      payload = { ...payload, [key]: value };
      return payload;
    });
  }
  
  const refetchPosts = async () => {
    const posts = await axios.get(`${API_URL}`) as AxiosResponse;
        if (posts.data.data && posts.data.data.length > 0) {
           setPostsList(posts.data.data);
        } else {
          setPostsList([]);
        }
  }

  const resetData = () => {
    setPostData(postDefaultConfig);
    setSelectedPostData(postDefaultConfig);
  }

  const handleSave = async () => {
    // Gather All Post data
    const { title, slug, content, id } = postData
    const isEditing = id > 0;
    if (isEditing) {
      const payload = {
        ...(selectedPostData.content !== content ? { content } : {}),
        ...(selectedPostData.title !== title ? { title } : {}),
        ...(selectedPostData.slug !== slug ? { slug } : {}),
      };
      try {
        const response = await axios.put(`${API_URL}/${id}`, payload);
        if (response.status === 200) {
          refetchPosts();
        }
      } catch (e) {
        console.error('#### OPERATIONS FAILED : %o', e);
      }
    } else {
      const payload = {
        title,
        slug,
        content,
      };
  
      // Call API that uploads data in Database and creates the post
      
      try {
        const response = await axios.post(API_URL, payload);
        if (response.status === 201 && response.data.data.id) {
          refetchPosts();
        }
      } catch (e) {
        console.error('#### OPERATIONS FAILED : %o', e);
      }
    }
    resetData()
  };

  const handleClickDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.status === 200 && response.data.message) {
        refetchPosts();
      }
    } catch (e) {
      console.error('#### DELETE FAILED : %o', e);
    }
  }

  const handleEditClick = (data: Post) => {
    const { id, slug, title, content } = data;
    setSelectedPostData({ id, title, slug, content });
    setPostData({ id, title, slug, content });
  }

  return (
    <Fragment>
      <h1 className="text-center my-4 text-[24px] md:text-[36px] font-bold">{messages.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center h-[80vh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <div>
          <label className="mr-4">Title</label>
          <input
            value={postData.title}
            onChange={(e) => handleDataChange(e.target.value, 'title')}
            placeholder="Title"
            className="h-70"
          />
        </div>
        <div>
          <label className="mr-4">Slug</label>
          <input
            value={postData.slug}
            onChange={(e) => handleDataChange(e.target.value, 'slug')}
            placeholder="Slug"
            className=""
          />
        </div>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          value={postData.content}
          onChange={(value) => handleDataChange(value, 'content')}
        />
        <div className='flex justify-between'>
          <button
            className=" bg-blue-400 border-[1px] border-black rounded-md mt-4 disabled:bg-gray-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={shouldDisableButton}
          >
            <span className="px-2 font-medium">{messages.button(postData.id>0)}</span>
          </button>
          <button
            className="border-[1px] border-black rounded-md mt-4 bg-gray-50"
            onClick={resetData}
          >
            <span className="px-2 font-medium">{messages.reset}</span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-center mt-4 text-[16px] font-bold">{messages.featuredPosts}</h3>
        <div>
          {postsList.length > 0 ? (
            postsList.map((item) => {
              return (
                <PostTile
                  key={`key-for-post-${item.id}`}
                  post={item}
                  redirectToPost={redirectToPost}
                  handleClickDelete={handleClickDelete}
                  handleEditClick={handleEditClick}
                />
              );
          })): (
            <h3 className='font-bold text-center mt-4'>{messages.noPosts}</h3>
          )}
        </div>
      </div>
    </div>
    </Fragment>
  );
}
