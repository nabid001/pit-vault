import React from "react";

const Photos = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return <main className="root-container">Photos slug: {slug}</main>;
};

export default Photos;
