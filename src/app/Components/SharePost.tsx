"use client"

import React from 'react';
import { FacebookShare , WhatsappShare } from 'react-share-kit';

type BlogPostProps = {
  title: string
  url: string
  content: string
}

const SharePost: React.FC = () => {
  const titleToShare = `Check out this amazing post: Cravefeed`;

  return (
    <div>
      <h1>title</h1>
      <p>content</p>

      {/* Facebook Share Button */}
      <FacebookShare url={"https://CraveFeeed.com"} title={'react-share-kit - social share buttons for next & react apps.'}   hashtag={'#react-share-kit'}/>
      <WhatsappShare
            url={'https://github.com/ayda-tech/react-share-kit'}
            title={'react-share-kit - social share buttons for next & react apps.'}
            separator=":: "
        />
    </div>
  );
};

export default SharePost;