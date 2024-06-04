import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./styles";

import { PiCaretLeftBold, PiUploadSimple } from "react-icons/pi";

import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { IngredientTag } from "../../components/IngredientTag";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { api } from "../../services/api";

export function New() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const navigate = useNavigate();

  function handleAddIngredient() {
    setIngredients(prevState => [...prevState, newIngredient]);
    setNewIngredient("");
  }

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState =>
      prevState.filter(ingredient => ingredient !== deleted)
    );
  }

  async function handleSubmit() {
    if (!name || !category || !price || !description) {
      return alert("Preencha todos os campos corretamente!");
    }

    await api
      .post("/dishes", {
        image,
        name,
        category,
        price,
        description,
        ingredients,
      })
      .then(alert("Prato criado com sucesso"))
      .catch(error => {
        if (error.response.message) {
          alert(error.response.message);
        } else {
          alert(error);
        }
      });

    navigate("/");
  }
  return (
    <Container>
      <Header />
      <main>
        <div>
          <PiCaretLeftBold />
          <Link to="/">Voltar</Link>
        </div>
        <h1>Adicionar prato</h1>
        <Form>
          <section>
            <div id="dishImage">
              <span>Imagem do prato</span>
              <Input
                icon={PiUploadSimple}
                label="Selecionar imagem"
                type="file"
                id="image"
                onChange={e => setImage(e.target.value)}
              />
            </div>
            <Input
              label="Nome"
              type="text"
              id="name"
              placeholder="Ex.: Salada Ceasar"
              onChange={e => setName(e.target.value)}
            />
            <Select
              className="category"
              label="Categoria"
              onChange={e => setCategory(e.target.value)}
            >
              <option value="default">Escolha uma categoria</option>
              <option value="refeicao">Refeição</option>
              <option value="sobremesa">Sobremesa</option>
              <option value="bebida">Bebida</option>
            </Select>
          </section>

          <section>
            <div className="input-wrapper">
              <label id="ingredients_label">Ingredientes</label>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <IngredientTag
                    key={String(index)}
                    value={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                ))}
                <IngredientTag
                  $isnew={true}
                  onChange={e => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  onClick={handleAddIngredient}
                />
              </ul>
            </div>
            <div className="input-wrapper">
              <Input
                label="Preço"
                type="number"
                placeholder="R$ 00,00"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </section>

          <Textarea
            label="Descrição"
            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            onChange={e => setDescription(e.target.value)}
          />
          <Button
            id="submit_button"
            title="Salvar alterações"
            onClick={handleSubmit}
          />
        </Form>
      </main>
      <Footer />
    </Container>
  );
}
