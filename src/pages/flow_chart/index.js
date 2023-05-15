import { Card, CardMedia } from '@mui/material';

const ImageGallery = () => {
  return (
    <div>
      <Card style={{ maxWidth: "100%", maxHeight: "100vh", overflow: "auto" }}>
        <CardMedia
          component="img"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          image="https://i.postimg.cc/L5zr9BP7/ai-act-flowchart.jpg"
          alt="Image 1"
        />
      </Card>
    </div>
  );
};

export default ImageGallery;
