/**
 * Created by Даша on 19.07.2017.
 */


var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Accordion = ReactBootstrap.Accordion;
var Panel=ReactBootstrap.Panel;
var FormControl=ReactBootstrap.FormControl;
var ButtonGroup=ReactBootstrap.ButtonGroup;


const RecipeDialog = React.createClass({
  getInitialState() {
      return {
        title: '',
        ingredients: [],
        showModal:true
      };
    },

  close() {
      this.props.onClose();
      this.setState({
        showModal:false
      })
  },

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  },
  handleChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value.split(',')
    });

  },
  handleSaveClick(e){
    var recipe={title:this.state.title,ingredients:this.state.ingredients,id:this.state.id};
    this.props.onSave(recipe);
    this.setState({
      showModal:false,
      title:'',
      ingredients:[]
    });
    this.props.onClose();

},
  componentWillReceiveProps(nextProps){
    if (nextProps.recipe !== this.props.recipe) {
      this.setState({
        title: nextProps.recipe.title,
        ingredients:nextProps.recipe.ingredients,
        id:nextProps.recipe.id
      })

    }
  },
  render() {
  //let recipe=this.props.recipe;
  //  if (!recipe) {
  //    recipe= {
  //      title: '',
  //      ingredients: []
  //    }
  //  }
    return (
      <div id='showdialog'>
        <Modal show={this.props.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title><h4 class='title'>{this.props.title}</h4></Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <FormControl
              id='titleRecipe'
              type="text"
              value={this.state.title}
              placeholder="Enter text"
              onChange={this.handleChangeTitle}
              />
            <FormControl.Feedback />

            <h4>Ingredients</h4>
            <FormControl
              id='ingredientsRecipe'
              type="text"
              value={this.state.ingredients}
              placeholder="Enter ingredients through coma"
              onChange={this.handleChangeIngredients}
              />
            <FormControl.Feedback />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='success' onClick={this.handleSaveClick} >{this.props.title}</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var Recipe=React.createClass({
  getInitialState(){
    return {
      showModal:false
    };
  },
  editRecipe(recipe){
    this.props.onEdit(this.props.recipe);
    this.setState({
      showModal:false
    })
  },
  deleteRecipe(recipe) {
    //var recipe={title:this.state.title,ingredients:this.state.ingredients,id:this.state.id};
    this.props.onDelete(this.props.recipe);
    //this.setState({
    //  showRecipe:false
    //})
  },
    getListIngredients(recipe) {
      let listResult=this.props.recipe.ingredients;
      if (!listResult) {
        listResult = []
      }else{
        const ingredients = this.props.recipe.ingredients;
        const ingredientsList = [];
        for (var i = 0; i < ingredients.length; i++) {
          ingredientsList.push(<li className="list-group-item">{ingredients[i]}</li>);
        }
        listResult = ingredientsList
      }
      return listResult;
  },
  render(){
    const listIngredients = this.getListIngredients();

    return (
      <Panel header={this.props.recipe.title} eventKey={this.props.recipe.id} >
       <ul className='list-group'> {listIngredients}</ul>
        <ButtonGroup>
         <Button bsStyle='info' onClick={this.editRecipe}>Edit</Button>
          </ButtonGroup>
        <span class='between'>                             </span>
        <ButtonGroup>
          <Button bsStyle='warning' onClick={this.deleteRecipe} class='delete'>Delete</Button>
      </ButtonGroup>
        </Panel>
    )

  }

});
var RecipeList=React.createClass({
  //getInitialState(){
  //  return {
  //    showRecipe: false
  //  };
  //},

  render(){
    var recipes=this.props.recipes.map((recipe)=> {
      return (
        <Recipe recipe={recipe} onDelete={this.props.onDelete} onEdit={this.props.onEdit} keyDel={recipe.id} />
      )
      });
    return (<div class='mainbox'>
      <Accordion>
        {recipes}
      </Accordion>
    </div>)
  }
});


var RecipeApp = React.createClass({
  getInitialState(){
    var baseOfRecipes = [{ title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"] , "id": 0},
      { title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],"id": 1},
      { title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"],id:2
      }];
    return {
      recipes:baseOfRecipes,
      showAddRecipe:false,
      showEditRecipe:false
    }
  },

  openAddRecipe() {
    this.setState({
      showAddRecipe:true,
      showEditRecipe:false
    });
  },
  handleNewRecipe(recipe){
    recipe.id=this.state.recipes.length;
    this.setState({
      recipes:this.state.recipes.concat(recipe)

    });
  },

  handleEditRecipe(recipe){
    var recipes=this.state.recipes;
    var index = recipe.id;
    recipes.splice(index, 1, recipe);
    this.setState({
      showEditRecipe:true,
      showAddRecipe:false,
      recipes:recipes,
      recipe:recipe
    });
  },
  handleDelete(recipe){
    var recipes=this.state.recipes;
    var index=recipe.id;
    if (recipes.length>1) {
      recipes.splice(index, 1);
    } else {
      recipes=[];
    }
    this.setState({
      recipes:recipes,
      showAddRecipe:false,
      showEditRecipe:false
    })
  },
  handleAddClose(){
    this.setState({
      showAddRecipe:false,
      showEditRecipe:false
    })
  },
  handleEditClose(){
    this.setState({
      showEditRecipe:false,
      showAddRecipe:false
    })
  },

 render:function(){
   return (<div class='allrecipe'>
            <RecipeList recipes={this.state.recipes} onEdit={this.handleEditRecipe} onDelete={this.handleDelete}/>
     <Button class='common'
       bsStyle="info"
       bsSize="large"
       onClick={this.openAddRecipe}
       >
       Add recipe
     </Button>

     <RecipeDialog showModal={this.state.showAddRecipe} title='Add recipe' onSave={this.handleNewRecipe} onClose={this.handleAddClose} />
       <RecipeDialog showModal={this.state.showEditRecipe} title='Edit recipe' onSave={this.handleEditRecipe} onClose={this.handleEditClose} recipe={this.state.recipe}/>
          </div>)
 }
});

ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
  <RecipeApp />,

  document.querySelector('.box')
);