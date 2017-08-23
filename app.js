/**
 * Created by Даша on 19.07.2017.
 */


var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Accordion = ReactBootstrap.Accordion;
var Panel=ReactBootstrap.Panel;
var FormControl=ReactBootstrap.FormControl;


const RecipeDialog = React.createClass({
  getInitialState() {
      if (this.props.recipe) {
        return {
          title: this.props.recipe.title,
          ingredients: this.props.recipe.ingredients,
          showModal:true
        }
      }
      return {
        title: null,
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

  open() {

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
    })

},
  render() {

    return (
      <div>


        <Modal show={this.props.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
            <FormControl
              id='titleRecipe'
              type="text"
              value={this.state.title}
              placeholder="Enter text"
              onChange={this.handleChangeTitle}
              />
            <FormControl.Feedback />
          </Modal.Header>
          <Modal.Body>
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
            <Button onClick={this.handleSaveClick}>{this.props.title}</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var Recipe=React.createClass({
  //getInitialState(){
  //  return {
  //    showRecipe: false,
  //    showModal:false
  //  };
  //},
  editRecipe(recipe){
    this.props.onEdit(this.props.recipe);
    //this.setState({
    //  showModal:true,
    //  showRecipe:false
    //})
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
        <p>
          <Button onClick={this.editRecipe}>Edit</Button></p>
        <p>
          <Button onClick={this.deleteRecipe}>Delete</Button></p>
      </Panel>
    )

  }

});
var RecipeList=React.createClass({
  getInitialState(){
    return {
      showRecipe: false
    };
  },

  render(){
    var recipes=this.props.recipes.map((recipe)=> {
      return (
        <Recipe recipe={recipe} onDelete={this.props.onDelete} onEdit={this.props.onEdit} keyDel={recipe.id} />
      )
      });
    return (<div>
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
      showAddRecipe:true
    });
  },
  handleNewRecipe(recipe){

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
      recipes:recipes
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
      showAddRecipe:false
    })
  },
  handleAddClose(){
    this.setState({
      showAddRecipe:false
    })
  },
  handleEditClose(){
    this.setState({
      showEditRecipe:false
    })
  },

 render:function(){
   return (<div>
            <RecipeList recipes={this.state.recipes} onEdit={this.handleEditRecipe} onDelete={this.handleDelete}/>
     <Button
       bsStyle="primary"
       bsSize="large"
       onClick={this.openAddRecipe}
       >
       Add recipe
     </Button>

     <RecipeDialog showModal={this.state.showAddRecipe} title='Add recipe' onSave={this.handleNewRecipe} onClose={this.handleAddClose}/>,
     <RecipeDialog showModal={this.state.showEditRecipe} title='Edit recipe' onSave={this.handleEditRecipe} onClose={this.handleEditClose} recipe={this.state.recipe}/>

          </div>)
 }
});

ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
  <RecipeApp />,

  document.querySelector('.box')
);