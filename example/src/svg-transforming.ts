const createDataUrl = (svg: string) => {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const addImage = (svg: string) => {
  const image = document.createElement("img");

  const dataUrl = createDataUrl(svg);
  console.log(dataUrl);
  image.src = dataUrl;
  image.style.width = "100px";
  image.style.height = "100px";
  document.body.prepend(image);
};

const addImage2 = (url: string) => {
  const image = document.createElement("img");
  image.src = url;
  image.style.width = "100px";
  image.style.height = "100px";
  document.body.prepend(image);
};

// addImage(THEME_2_ICONS.mute.svg);
// addImage2(THEME_2_ICONS.mute.dataUrl);

// addImage(THEME_2_ICONS.unMute.svg);
// addImage2(THEME_2_ICONS.unMute.dataUrl);

// addImage(THEME_2_ICONS.audioPlay.svg);
// addImage2(THEME_2_ICONS.audioPlay.dataUrl);

// addImage(THEME_2_ICONS.videoPause.svg);
// addImage2(THEME_2_ICONS.videoPause.dataUrl);

// addImage(THEME_2_ICONS.videoPlay.svg);
// addImage2(THEME_2_ICONS.videoPlay.dataUrl);

// addImage(THEME_2_ICONS.videoReplay.svg);
// addImage2(THEME_2_ICONS.videoReplay.dataUrl);

// addImage(THEME_2_ICONS.close.svg);
// addImage2(THEME_2_ICONS.close.dataUrl);

// addImage(THEME_2_ICONS.complete.svg);
// addImage2(THEME_2_ICONS.complete.dataUrl);
//
// addImage(THEME_2_ICONS.help.svg);
// addImage2(THEME_2_ICONS.help.dataUrl);
//
