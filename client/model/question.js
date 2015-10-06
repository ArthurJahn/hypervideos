Question = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    name: {
      type: 'string',
      default: 'Nova questão',
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
    description: {
      type: 'string',
      default: 'Enunciado da questão',
      validator: Validators.and([
          Validators.required('O nome não pode ser vazio'),
          Validators.string(),
          Validators.minLength(10,'Enunciado muito curto'),
          Validators.maxLength(3000,'Enunciado muito longo')
        ])
    },
    answers: {
      type: 'array',
      default: function() {
        return ["resposta 1", "resposta 2"];
      },
      validator: Validators.and([
          Validators.required('A questão precisa ter respostas'),
          Validators.minLength(2,'Mínimo duas respostas'),
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
