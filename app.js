/**
 * Created by Даша on 19.07.2017.
 */
var baseOfRecipes = [{ title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"] , "id": 0},
  { title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],"id": 1},
  { title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"],id:2
}];

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;


const Recipe = React.createClass({
  getInitialState() {
    return {
      showModal: false
    };
  },
  getList: function (list) {
    if (!list) {
      return []
    } else {
      const ingr = list.split(',');
      const ingrList = [];
      for (var i = 0; i < ingr.length; i++) {
        ingrList.push(<li className="list-group-item">{ingr[i]}</li>);
      }
      return (
        ingrList
      )
    }
  },
  deleteRecipe: function (e) {

    recipes.splice(e.target.id, 1);
    localStorage.setItem('Recipes', JSON.stringify(recipes));
    this.setState({
      showRecipe: false
    });
  },
  editRecipe:function () {
    this.setState({
      childVisible: !this.state.childVisible
    });
  },
  saveEditions: function (e) {
    var recipeTitle = $("#recipeTitle").val() || 'Undefined';
    var ingridients = $("#ingridients").val() || 'Undefined';
    this.props.recipe.recipe = recipeTitle;
    this.props.recipe.ingridients = ingridients;
    recipes[e.target.id] = {
      "recipe": recipeTitle,
      "ingridients": ingridients,
      "id": e.target.id
    };
    localStorage.setItem('Recipes', JSON.stringify(recipes));
    this.setState({
      childVisible: !this.state.childVisible
    });
  },
    close() {
    this.setState({
      showModal: false
    });
  },

  open() {
    this.setState({
      showModal: true
    });
  },

  render() {


    return (
      <div>
        <p>Recipe title</p>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
          >
          Add recipe
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Recipe title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Ingridients</h4>
            <p> bla-bla</p>
            //<hr />
            //
            //<h4>Overflowing text to show scroll behavior</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});



//var RecipeBox = React.createClass({
//
//
//
//
//
//
//});
ReactDOM.render(
  //<Button bsStyle="primary">Primary</Button>,
 <Recipe />,

  document.querySelector('.box')
);