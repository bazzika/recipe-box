/**
 * Created by Даша on 19.07.2017.
 */


var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Accordion = ReactBootstrap.Accordion;
var Panel=ReactBootstrap.Panel;
var FormControl=ReactBootstrap.FormControl;


const AddRecipeButton = React.createClass({
  getInitialState() {
    return {
      showModal: false,
      showRecipe: false,
      title:null,
      ingredients:[]
    };
  },
  close() {
    this.setState({
      showModal: false,
      showRecipe: false
    });
  },

  open() {
    this.setState({
      showModal: true,
      showRecipe:false
    });
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

},
  render() {


    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
          >
          Add recipe
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Recipe</Modal.Title>
            <FormControl
              id='titleRecipe'
              type="text"
              value={this.title}
              placeholder="Enter text"
              onChange={this.handleChangeTitle}
              />
            <FormControl.Feedback />
          </Modal.Header>
          <Modal.Body>
            <h4>Ingredients</h4>
            <FormControl
              id='ingrRecipe'
              type="text"
              value={this.ingredients}
              placeholder="Enter ingredients through coma"
              onChange={this.handleChangeIngredients}
              />
            <FormControl.Feedback />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSaveClick}>Save</Button>
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
      showRecipe: false,
      showModal:false
    };
  },
  editRecipe(){
    this.props.onEdit(this.props.recipe);
    this.setState({
      showModal:true
    })
  },
  deleteRecipe(recipe) {
    //var recipe={title:this.state.title,ingredients:this.state.ingredients,id:this.state.id};
    this.props.onDelete(this.props.recipe);
    this.setState({
      showRecipe:false
    })
  },
    getListIngredients() {
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
  //editRecipe() {
  //var recipe={title:this.state.title,ingredients:this.state.ingredients,id:this.state.id};
  //this.props.onEdit(recipe);
  //},

  render(){
    var recipes=this.props.recipes.map((recipe)=> {
      return (
        <Recipe recipe={recipe} onDelete={this.props.onDelete} keyDel={recipe.id}/>
        //<Recipe recipe={recipe} onEdit={this.props.onEdit} keyEd={recipe.id} />
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
      showRecipe:false
    }
  },
  handleNewRecipe(recipe){

    this.setState({
      recipes:this.state.recipes.concat(recipe)

    });
  },

  handleEdit(recipe){
    var recipes=this.state.recipes;
    var index = recipe.id;
    this.state.recipes.splice(index, 1, recipe);

    this.setState({
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
      showRecipe:false
    })
  },
 render:function(){
   return (<div>
            <RecipeList recipes={this.state.recipes} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
            <AddRecipeButton onSave={this.handleNewRecipe} />
          </div>)
 }
});

ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
  <RecipeApp />,

  document.querySelector('.box')
);