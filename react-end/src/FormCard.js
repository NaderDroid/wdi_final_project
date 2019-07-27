import React from 'react'
import {Button, ButtonGroup, Card, CardBody, CardTitle, Form, FormGroup, Input, Label} from "reactstrap";
import spinner from "./spinner2.gif";

export default (props) => {
    return (

        <Card className="card">
                <CardBody>
                    <Form onSubmit={props.handleSubmit}>
                        <CardTitle>Add A mosque to Map</CardTitle>
                        <FormGroup>
                            <Label for="Mosque name">Name</Label>
                            <Input onChange={props.handleChange}
                                   type="text"
                                   name="name"
                                   value={props.info.name}
                                   id="name"
                                   placeholder="Enter mosque name"/>
                            <Label for="city">City</Label>
                            <Input onChange={props.handleChange}
                                   type="text"
                                   name="city"
                                   id="city"
                                   value={props.info.city}
                                   placeholder="City name"
                            />
                            <Label for="region">Region</Label>
                            <Input onChange={props.handleChange}
                                   type="text"
                                   name="region"
                                   id="region"
                                   value={props.info.region}
                                   placeholder="City name"
                            />
                            <Label for="Description">Description</Label>
                            <Input onChange={props.handleChange}
                                   type="textarea"
                                   name="desc"
                                   id="message"
                                   value={props.info.desc}
                                   placeholder="Enter a description"
                            />
                            <br/>
                            <h6>Does this mosque holds Jumm'ah</h6>
                            <ButtonGroup>
                                <Button color="primary"
                                        onClick={() => props.handleRadio(false)}> Yes </Button>
                                <Button color="primary" onClick={() => props.handleRadio(true)}> No </Button>
                            </ButtonGroup>
                            <p>Selected: {props.info.hasJum ? <p>This mosque holds Jumm'ah</p> :
                                <p>This mosque does NOT hold Jumm'ah</p>}</p>

                        </FormGroup>
                        <Button className="submit" color="secondary" type="submit">Save Mosque</Button>
                        <Button className="submit" onClick={props.clearForm} color="secondary">Clear form</Button>
                    </Form>
                </CardBody>
        </Card>

    );
}

