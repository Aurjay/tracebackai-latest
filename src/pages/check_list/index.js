import { Card, CardMedia } from '@mui/material';

const ImageGallery = () => {
  return (
    <div>
      <Card style={{ maxWidth: "100%", maxHeight: "100vh", overflow: "auto" }}>
        <CardMedia
          component="img"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          image="https://i.postimg.cc/K8GnxdHb/check-list.jpg"
          alt="Image 2"
        />
      </Card>
    </div>
  );
};

export default ImageGallery;
