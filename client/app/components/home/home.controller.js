class HomeController {
  constructor($http) {
    'ngInject';

    this.$http = $http;

    this.name = 'home';
    this.title = 'Give your team autonomy while preserving the visual identity of your company.';

    this.images = [];
    this.image = null;
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

    this.chooseImage(0);
  }

  chooseImage(id) {    
    this.image = this.images.find(img => img.id == id);
  }
}

export default HomeController;
