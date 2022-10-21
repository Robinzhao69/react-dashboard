import React from "react"
// Own components
import LeftPane from "../LeftPane/LeftPane"
import RightPane from "../RightPane/RightPane"
import Popup from "../Popup/Popup"
//  Helpers
import chooseImage from "../../helpers/chooseImage"
// Import data from data source
import navItemsObject from "../../data/navItems"
import productsObject from "../../data/products"

//  Styling / CSS
import "./Dashboard.css"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productCards: [],
            open: true,
            cardClicked: {},
            editMode: false,
        }
    }



    componentDidMount() {    
        this.setState({ productCards: productsObject.products })
    }

    onButtonClicked = () => {
        this.setState({open: !this.state.open})
    }

    addButtonClicked = (inputFromPopup) => {
        let imageFromHelper = chooseImage(inputFromPopup);
        let toBeAdded = [
            {
                id: this.state.productCards.length + 1,
                name: inputFromPopup,
                img: imageFromHelper
            }
        ]

        let mergedArrays = this.state.productCards.concat(toBeAdded)
        this.setState({
            productCards: mergedArrays,
            open: !this.state.open,
        })
    }

    onCardClicked= (idFromCard) => {
        if(this.state.productCards[idFromCard - 1].name === "Placeholder"){
           this.setState({
            editMode: false,
           })
        }
        else{
            this.setState({
                editMode: true,
            })
        }
        this.setState(
            {
                open: !this.state.open,
                cardClicked: this.state.productCards[idFromCard - 1]
            }
        )
    }


    render() {
        if (this.state.open === true) {
            return (
                <article className="dashboard">
                    <LeftPane navigationListItems={navItemsObject.navItems} buttonText="Go Premium!" />
                    <RightPane onProductCardClicked={this.onCardClicked} onButtonClicked={this.onButtonClicked} productCards={this.state.productCards} buttonSymbol="+" buttonText="Voeg een product toe" />
                </article>
            )
        }
        return(
            <Popup editMode={this.state.editMode} cardClicked={this.state.cardClicked} addButtonClicked={this.addButtonClicked}/>
        )

    }
}

export default Dashboard

