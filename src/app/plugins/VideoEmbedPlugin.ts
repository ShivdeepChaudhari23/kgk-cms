import Quill from "quill";
import { Plugin } from "../types/Plugins";

const BlockEmbed = Quill.import("blots/block/embed") as any;

class VideoEmbedBlot extends BlockEmbed {
  static blotName = "video";
  static tagName = "iframe";

  static create(value: any) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", "true");
    node.setAttribute("width", "560");
    node.setAttribute("height", "315");
    return node;
  }

  static value(node: any) {
    return node.getAttribute("src");
  }
}

// Register the custom blot with Quill
Quill.register(VideoEmbedBlot);

const VideoEmbedPlugin: Plugin = {
  id: "videoEmbed",
  name: "Video Embed",
  install: (editor: any) => {
    if (typeof window === "undefined") return;

    // Add a toolbar button handler for video embeds
    const toolbar = editor.getModule("toolbar");
    toolbar.addHandler("videoEmbed", () => {
      const videoUrl = prompt("Enter video URL");
      const range = editor.getSelection();
      if (range && videoUrl) {
        editor.insertEmbed(range.index, "video", videoUrl);
      }
    });

    // Check if button exists and if not, add button to toolbar
    const doesButtonExist = !!document.getElementsByClassName('embed-video-button')[0];
    if (!doesButtonExist) {
        const videoButton = document.createElement("button");
        videoButton.className = 'ql-blockquote embed-video-button';
        videoButton.innerHTML = "Embed";
        videoButton.onclick = () => {
        const videoUrl = prompt("Please enter video URL");
        if (videoUrl) {
            const range = editor.getSelection();
            const videoId = videoUrl.split("v=")[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            editor.insertEmbed(range.index || 0, "video", embedUrl);
        }
        };

        const videoButtonSpan = document.createElement("span");;
        videoButtonSpan.className = 'ql-formats';

        // Append the custom button to the toolbar
        const toolbarContainer = document.getElementsByClassName('ql-toolbar')[0];
        if (toolbarContainer) {
        videoButtonSpan.appendChild(videoButton);
        toolbarContainer.appendChild(videoButtonSpan);
        }
    }
    
  }
};

export default VideoEmbedPlugin;
