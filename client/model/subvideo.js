Subvideo = Astro.Class({
  name: 'Subvideo',
  collection: Subvideos,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    name: {
      type: 'string',
      default: 'Novo subvideo',
      validator: Validators.and([
          Validators.required('O nome não pode ser vazio'),
          Validators.string(),
          Validators.minLength(3,'Nome muito curto'),
        ])
    },
    hypervideoId: {
      type: 'string',
      validator: Validators.required(),
    },
    mediaId: {
      type: 'string',
      validator: Validators.required(),
    },
    description: {
      type: 'string',
      default: 'Enunciado da questão',
      validator: Validators.and([
          Validators.required('A descrição não pode ser vazia'),
          Validators.string(),
          Validators.minLength(10,'descrição muito curto'),
          Validators.maxLength(3000,'descrição muito longo')
        ])
    },
    x: {
      type: 'number',
      validator: Validators.required(),
    },
    y: {
      type: 'number',
      validator: Validators.required(),
    },
  },
  methods: {
    move: function(x,y) {
      this.x = x;
      this.y = y;
    }
  },
  behaviors: ['timestamp']
});
