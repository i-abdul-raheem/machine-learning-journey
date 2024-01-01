const form = document.getElementById('predict-form');
const image = document.getElementById('image');
const prediction = document.getElementById('prediction');
let classifier;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const url = URL.createObjectURL(formData.get('image'));
  image.src = url;
  image.style.display = 'block';
  prediction.innerHTML = 'Predicting...';
  classifier = ml5.imageClassifier('MobileNet', () => {
    predictFn(url);
  });
});

const predictFn = (url) => {
  classifier.predict(loadImage(url), (err, res) => {
    if (err) {
      console.error(err);
      prediction.innerHTML = 'ERROR. Try Again';
    } else {
      prediction.innerHTML = `Label: ${res[0]?.label}<br />Confidence: ${res[0]?.confidence}`;
    }
  });
};

const loadImage = (url) => {
  const myCanvas = document.getElementById('my_canvas_id');
  const ctx = myCanvas.getContext('2d');
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = url;
  return img;
};
