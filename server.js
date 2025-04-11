import app from './src/app.js';

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.send('This is TINN api!');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
