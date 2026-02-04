const imgPublicId = async (imageUrl) => {
  const imgSegments = imageUrl.split("/");
  const imgName = imgSegments[imgSegments.length - 1];

  const imgNameWithoutExtention = imgName.split(".");
  const publicId = imgNameWithoutExtention[0];
  return publicId;
};

module.exports = { imgPublicId };
