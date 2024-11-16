"use client"

import { usePathname } from "next/navigation";
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Fragment, useEffect, useState } from "react";

import { PostConfiguration } from "app/types/Post";


import 'react-quill-new/dist/quill.snow.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009/content";

const Shivdeep = () => {
    const [post, setPost] = useState<PostConfiguration>({} as PostConfiguration)
    const pathname = usePathname();
    const slug = pathname?.split('/').pop();
    useEffect(() => {
        if (slug) { 
            (async function () {
                try {
                    const response = await axios.get(`${API_URL}/${slug}`);
                    if (response.status === 200 && response.data.data) {
                        setPost(response.data.data);
                        const postContent = DOMPurify.sanitize(response.data.data.content, {
                            FORBID_TAGS: ['script']
                        });
                        const container = document.getElementById('post-container') as HTMLElement;
                        container.innerHTML = postContent;
                    }
                } catch (e) {
                  console.error("#### ERROR FETCHING LIST : %o", e)
                }
              }());
        }
      }, []);
    return (
        <Fragment>
            <h1 className=" my-8 font-bold text-[24px] text-center md:text-[36px]">{post.title}</h1>
            <div id="post-container" className="ql-editor"></div>
        </Fragment>
    );
}

export default Shivdeep;