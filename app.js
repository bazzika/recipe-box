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
  handleChange(e) {
    this.setState({ value: e.target.value });
  },
  handleSaveClick(){
    var recipe={title:this.state.title,ingredients: this.state.ingredients};
    this.props.onSave(recipe)
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
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
              />
            <FormControl.Feedback />
          </Modal.Header>
          <Modal.Body>
            <h4>Ingridients</h4>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter ingrients throuh coma"
              onChange={this.handleChange}
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
  render:function(){
    var recipes=this.props.recipes.map(function(recipe){
      return (<Panel header={recipe.title} eventKey={recipe.id}>{recipe.ingredients}</Panel>)
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
    return {recipes:baseOfRecipes}
  },
  handleNewRecipe(recipe){
    alert(recipe)
  },
 render:function(){
   return (<div>
            <RecipeList recipes={this.state.recipes}/>
            <AddRecipeButton onSave={this.handleNewRecipe}/>
          </div>)
 }
});

ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
  <RecipeApp />,

  document.querySelector('.box')
);