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
  //getList: function (list) {
  //  if (!list) {
  //    return []
  //  } else {
  //    const ingr = list.split(',');
  //    const ingrList = [];
  //    for (var i = 0; i < ingr.length; i++) {
  //      ingrList.push(<li className="list-group-item">{ingr[i]}</li>);
  //    }
  //    return (
  //      ingrList
  //    )
  //  }
  //},
  //deleteRecipe: function (e) {
  //
  //
  //  this.setState({
  //    showModal: false
  //  });
  //},
  //editRecipe:function () {
  //
  //
  //  });
  //},
  //saveEditions: function (e) {
  //
  //},
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
      title: e.target.value,
    });
  },
  handleChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value
    });

  },
  handleSaveClick(event){
    var recipe={title:this.state.title,ingredients:this.state.ingredients,id:this.state.id};
    this.props.onSave(recipe);
    //this.setState({
    //  recipe:this.state.recipe.concat(recipe)
    //});
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
var RecipeList=React.createClass({
  //getInitialState(){
  //  return {
  //    showRecipe: false
  //  };
  //},
  //editRecipe() {
  //  //var recipes = this.state.recipes;
  //var recipe={title:this.state.title,ingredients:[this.state.ingredients],id:this.state.id};
  //this.props.onEdit(recipe);
  //  ////var newRecipe = {
  //  ////  title:title,
  //  ////  ingredients:ingredients.split(','),
  //  ////  id:id
  //  ////};
  //  //var i = recipe.find(id);
  //  //recipe.splice(i, 1, newRecipe);
  //  //console.log("edit: ", recipe);
  //  //this.setState({
  //  //  recipe: recipe
  //  //});
  //},
  //onDelete(e) {
  //  var recipes=this.state.recipes;
  //  recipes.splice(e.target.id, 1);
  //  this.setState({
  //    recipes:recipes
  //  });
  //},
  render:function(){
    var recipes=this.props.recipes.map(function(recipe){
      return (
        <Panel header={recipe.title} eventKey={recipe.id}>
          {recipe.ingredients}
         <p><Button>Edit</Button>
            <Button >Delete</Button></p>
          </Panel>
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
      counter:3
    }
  },
  handleNewRecipe(recipe){

    this.setState({
      recipes:this.state.recipes.concat(recipe)
    });
  },
  handleEdit(recipe){
    //var i = recipe.find(id);
    //recipes.splice(i, 1, recipe);
    //
    //this.setState({
    //  recipes:this.state.recipes.concat(recipe)
    //});
  },
  handleDelete(){

  },
 render:function(){
   return (<div>
            <RecipeList recipes={this.state.recipes} />
            <AddRecipeButton onSave={this.handleNewRecipe} />
          </div>)
 }
});

ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
  <RecipeApp />,

  document.querySelector('.box')
);