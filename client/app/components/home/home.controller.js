import Quill from 'quill';

export default class HomeController {
  constructor($http) {
    'ngInject';

    this.$http = $http;

    this.name = 'home';
    
    this.title = '<h2>Give your team autonomy while preserving the visual identity of your company.</h2>';
    this.link = 'www.tradetools.co';

    this.images = [];
    this.image = null;

    this.modalImages = false;

    this.titleEditor = null;
    this.linkEditor = null;
  }

  $onInit() {
    this.loadImages();
  }

  loadImages() {
    this.$http
      .get('https://picsum.photos/v2/list')
      .then(respoonse => this.defineImages(respoonse.data));
  }

  defineImages(data) {
    this.images = data;
    
    this.images.forEach(item => this.defineImageSize(item));

    this.chooseImage(0);
  }

  defineImageSize(image) {
    const id = '/' + image.id + '/';
      
    image.download_url = image.download_url.split(id).shift() + id + '500/400';
  }

  chooseImage(id) {    
    this.image = this.images.find(img => img.id == id);
  }

  toggleModalImages() {
    this.modalImages = !this.modalImages;
  }

  activeEditor(id, event) {
    const editor = [id + 'Editor'];

    if(!this[editor]) {
      this[editor] = new Quill(event.target);
    }

    this[editor].focus();
  }
}
