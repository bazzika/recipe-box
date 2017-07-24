/**
 * Created by Даша on 19.07.2017.
 */
var baseOfRecipes = [{ title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"] , "id": 0},
  { title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],"id": 1},
  { title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"],id:2
  }];

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Accordion = ReactBootstrap.Accordion;
var Panel=ReactBootstrap.Panel;
var FormControl=ReactBootstrap.FormControl;


const Recipe = React.createClass({
  getInitialState() {
    return {
      showModal: false,
      showRecipe: false
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

  render() {


    return (
      <div>
        <div>
          <Accordion>
            <Panel header='title' id="0">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
            <Panel header="Collapsible Group Item #2" eventKey="2">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
            <Panel header="Collapsible Group Item #3" eventKey="3">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
          </Accordion>
          </div>

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