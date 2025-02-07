import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { array } from "prop-types";



export const GameForm = () => {

const {store, actions} = useContext(Context)
const navigate = useNavigate()

  useEffect(() => {
    if (store.token == null) {
      navigate('/register')
    }
  }, [])

  const [formData, setFormData] = useState({
      name: "",
      genres: [],
      cover_image:"",
      additional_images: "",
      modes: [],
      player_perspective: [],
      themes: [],
      keywords: "",
      release_date: "",
      system_requirements: "",
      achievements: "",
      rating: "",
      players: "",
      related_games: "",
      language: "",
      summary: "",
      description: "",
      trailer: "",
      game_file: ""
  });
  // const [coverImage, setCoverImage] = useState(null);
  // const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxes = ({target}) => {
    const {name, value, checked} = target
    if (checked == true) {
      setFormData({...formData, [name]: [
        ...formData[name],
        value
      ]})
    }
    else {
      let filteredData = formData[name].filter((item) => item != value)
      setFormData({...formData, [name]: filteredData})
      console.log(formData)
    }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formDataObj = new FormData()
      formDataObj.append("cover_image", formData.cover_image);
      formDataObj.append("trailer", formData.trailer.split('=')[1])
      formDataObj.append("modes", formData.modes.join())
      formDataObj.append("genres", formData.genres.join())
      formDataObj.append("player_perspective", formData.player_perspective.join())
      formDataObj.append("themes", formData.themes.join())
      formDataObj.append("game_file", formData.game_file)
    

      Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]));
        alert("Game successfully added")
      
      if (formData.additional_images) {
        Array.from(formData.additional_images).forEach((file) => {
          formDataObj.append("additional_images[]", file);
          });
      }

      console.log([...formDataObj.entries()]);

    try{
      const response = await fetch(process.env.BACKEND_URL + "/submit-game", {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: `Bearer ${store.token}`,
          },
      });
      if (response.ok) {
        const result = await response.json();
        alert("Game successfully added!");
        console.log(result);
      } else {
        const error = await response.json();
        console.error("Error submitting game:", error);
        alert(error.message || "Error submitting game.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting game.");
    }
  }

  
//form info
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Name:
        <input 
        type="text"
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required />
      </label>

      <label>
        Cover Image:
        <input 
        type="file" 
        name="cover_image" 
        onChange={(event) => {
          setFormData({...formData, cover_image: event.target.files[0] })
        }}  
        />
      </label>

      {/* Second Section */}
      
      <div>
        <label>Genre:</label>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGenres" aria-expanded="false" aria-controls="collapseExample">
          Select a genre
        </button>
        <div className="collapse" id="collapseGenres">
        <div className="card card-body w-25">
          <ul className="list-group" onChange={handleCheckboxes}>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Point-and-click" id="Point-and-click"/>
                <label className="form-check-label stretched-link" htmlFor="Point-and-click">Point-and-click</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Fighting" id="Fighting"/>
                <label className="form-check-label stretched-link" htmlFor="Fighting">Fighting</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Shooter" id="Shooter"/>
                <label className="form-check-label stretched-link" htmlFor="Shooter">Shooter</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Music" id="Music"/>
                <label className="form-check-label stretched-link" htmlFor="Music">Music</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Platform" id="Platform"/>
                <label className="form-check-label stretched-link" htmlFor="Platform">Platform</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Puzzle" id="Puzzle"/>
                <label className="form-check-label stretched-link" htmlFor="Puzzle">Puzzle</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Racing" id="Racing"/>
                <label className="form-check-label stretched-link" htmlFor="Racing">Racing</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Real Time Strategy (RTS)" id="Real Time Strategy (RTS)"/>
                <label className="form-check-label stretched-link" htmlFor="Real Time Strategy (RTS)">Real Time Strategy (RTS)</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="modgenreses" type="checkbox" value="Role-playing (RPG)" id="Role-playing (RPG)"/>
                <label className="form-check-label stretched-link" htmlFor="Role-playing (RPG)">Role-playing (RPG)</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Simulator" id="Simulator"/>
                <label className="form-check-label stretched-link" htmlFor="Simulator">Simulator</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Sport" id="Sport"/>
                <label className="form-check-label stretched-link" htmlFor="Sport">Sport</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Strategy" id="Strategy"/>
                <label className="form-check-label stretched-link" htmlFor="Strategy">Strategy</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Turn-based strategy (TBS)" id="Turn-based strategy (TBS)"/>
                <label className="form-check-label stretched-link" htmlFor="Turn-based strategy (TBS)">Turn-based strategy (TBS)</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Tactical" id="Tactical"/>
                <label className="form-check-label stretched-link" htmlFor="Tactical">Tactical</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Hack and slash/Beat 'em up" id="Hack and slash/Beat 'em up"/>
                <label className="form-check-label stretched-link" htmlFor="Hack and slash/Beat 'em up">Hack and slash/Beat 'em up</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Quiz/Trivia" id="Quiz/Trivia"/>
                <label className="form-check-label stretched-link" htmlFor="Quiz/Trivia">Quiz/Trivia</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Pinball" id="Pinball"/>
                <label className="form-check-label stretched-link" htmlFor="Pinball">Pinball</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Arcade" id="Arcade"/>
                <label className="form-check-label stretched-link" htmlFor="Arcade">Arcade</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Visual Novel" id="Visual Novel"/>
                <label className="form-check-label stretched-link" htmlFor="Visual Novel">Visual Novel</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="Card & Board Game" id="Card & Board Game"/>
                <label className="form-check-label stretched-link" htmlFor="Card & Board Game">Card & Board Game</label>
              </li>
              <li className="list-group-item">
                <input className="form-check-input me-1" name="genres" type="checkbox" value="MOBA" id="MOBA"/>
                <label className="form-check-label stretched-link" htmlFor="MOBA">MOBA</label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <label>Game Modes:</label>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseModes" aria-expanded="false" aria-controls="collapseExample">
          Select a mode
        </button>
      <div className="collapse" id="collapseModes">
        <div className="card card-body w-25">
        <ul className="list-group" onChange={handleCheckboxes}>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Single Player" id="Single Player"/>
              <label className="form-check-label stretched-link" htmlFor="Single Player">Single Player</label>
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Multiplayer" id="Multiplayer"/>
              <label className="form-check-label stretched-link" htmlFor="Multiplayer">Multiplayer</label>
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Co-operative" id="Co-operative"/>
              <label className="form-check-label stretched-link" htmlFor="Co-operative">Co-operative</label>
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Split screen" id="Split screen"/>
              <label className="form-check-label stretched-link" htmlFor="Split screen">Split screen</label>
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Massively Multiplayer Online (MMO)" id="Massively Multiplayer Online (MMO)"/>
              <label className="form-check-label stretched-link" htmlFor="Massively Multiplayer Online (MMO)">Massively Multiplayer Online (MMO)</label>
            </li>
            <li className="list-group-item">
              <input className="form-check-input me-1" name="modes" type="checkbox" value="Battle Royale" id="Battle Royale"/>
              <label className="form-check-label stretched-link" htmlFor="Battle Royale">Battle Royale</label>
            </li>
          </ul>
        </div>
      </div>
      </div>

      <div>
        <label>Player Perspective:</label>
          <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePerspective" aria-expanded="false" aria-controls="collapseExample">
              Select a player perspective
          </button>
          <div className="collapse" id="collapsePerspective">
            <div className="card card-body w-25">
            <ul className="list-group" onChange={handleCheckboxes}>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="First person" id="First person"/>
                  <label className="form-check-label stretched-link" htmlFor="First person">First person</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Third person" id="Third person"/>
                  <label className="form-check-label stretched-link" htmlFor="Third person">Third person</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Bird view / Isometric" id="Bird view / Isometric"/>
                  <label className="form-check-label stretched-link" htmlFor="Bird view / Isometric">Bird view / Isometric</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Side view" id="Side view"/>
                  <label className="form-check-label stretched-link" htmlFor="Side view">Side view</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Text" id="Text"/>
                  <label className="form-check-label stretched-link" htmlFor="Text">Text</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Auditory" id="Auditory"/>
                  <label className="form-check-label stretched-link" htmlFor="Auditory">Auditory</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="player_perspective" type="checkbox" value="Virtual Reality" id="Virtual Reality"/>
                  <label className="form-check-label stretched-link" htmlFor="Virtual Reality">Virtual Reality</label>
                </li>
              </ul>
            </div>
          </div>
      </div>

      <div>
        <label>Themes:</label>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThemes" aria-expanded="false" aria-controls="collapseExample">
          Select a theme
        </button>
          <div className="collapse" id="collapseThemes">
            <div className="card card-body w-25">
            <ul className="list-group" onChange={handleCheckboxes}>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Non-fiction" id="Non-fiction"/>
                  <label className="form-check-label stretched-link" htmlFor="Non-fiction">Non-fiction</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Sandbox" id="Sandbox"/>
                  <label className="form-check-label stretched-link" htmlFor="Sandbox">Sandbox</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Educational" id="Educational"/>
                  <label className="form-check-label stretched-link" htmlFor="Educational">Educational</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Open world" id="Open world"/>
                  <label className="form-check-label stretched-link" htmlFor="Open world">Open world</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Warfare" id="Warfare"/>
                  <label className="form-check-label stretched-link" htmlFor="Warfare">Warfare</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Party" id="Party"/>
                  <label className="form-check-label stretched-link" htmlFor="Party">Party</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="4X (explore, expand, exploit, and exterminate)" id="4X (explore, expand, exploit, and exterminate)"/>
                  <label className="form-check-label stretched-link" htmlFor="4X (explore, expand, exploit, and exterminate)">4X (explore, expand, exploit, and exterminate)</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Mystery" id="Mystery"/>
                  <label className="form-check-label stretched-link" htmlFor="Mystery">Mystery</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Action" id="Action"/>
                  <label className="form-check-label stretched-link" htmlFor="Action">Action</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Fantasy" id="Fantasy"/>
                  <label className="form-check-label stretched-link" htmlFor="Fantasy">Fantasy</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Science fiction" id="Science fiction"/>
                  <label className="form-check-label stretched-link" htmlFor="Science fiction">Science fiction</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Horror" id="Horror"/>
                  <label className="form-check-label stretched-link" htmlFor="Horror">Horror</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Thriller" id="Thriller"/>
                  <label className="form-check-label stretched-link" htmlFor="Thriller">Thriller</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Survival" id="Survival"/>
                  <label className="form-check-label stretched-link" htmlFor="Survival">Survival</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Historical" id="Historical"/>
                  <label className="form-check-label stretched-link" htmlFor="Historical">Historical</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Stealth" id="Stealth"/>
                  <label className="form-check-label stretched-link" htmlFor="Stealth">Stealth</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Comedy" id="Comedy"/>
                  <label className="form-check-label stretched-link" htmlFor="Comedy">Comedy</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Business" id="Business"/>
                  <label className="form-check-label stretched-link" htmlFor="Business">Business</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" name="themes" type="checkbox" value="Romance" id="Romance"/>
                  <label className="form-check-label stretched-link" htmlFor="Romance">Romance</label>
                </li>
              </ul>
            </div>
          </div>
      <div>
        <label>
            Keywords/Tags:
            <input 
            type="text"
            name="keywords" 
            value={formData.keywords} 
            onChange={handleChange} 
            required />
          </label>
      </div>

       
      </div>

      <div>
        <label>Release Date:</label>
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
      </div>

      {/* Third Section */}
      <div>
        <label>System Requirements:</label>
        <textarea name="system_requirements" value={formData.system_requirements} onChange={handleChange} required />
      </div>

      <div>
        <label>Achievements:</label>
        <input type="text" name="achievements" value={formData.achievements} onChange={handleChange} />
      </div>
 
      <div>
        <label>Additional Images:</label>
        <input
        type="file" 
        name="additional_images" 
        multiple 
        onChange={(event) => {
          setFormData({ ...formData, additional_images: event.target.files });
        }}
        />
      </div>


      <div>
        <label>Rating:</label>
        <select name="rating" value={formData.rating} onChange={handleChange} required>
          <option value="">Select a rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </select>
      </div>

      <div>
        <label>Number of Players:</label>
        <select name="players" value={formData.players} onChange={handleChange} required>
          <option value="">Select number of players</option>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Related Games:</label>
        <input type="text" name="related_games" value={formData.relatedGames} onChange={handleChange} />
      </div>

      <div>
        <label>Languages:</label>
        <select name="language" value={formData.language} onChange={handleChange} required>
          <option value="">Select a language</option>
          <option value="Spanish">Spanish</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
          <option value="Mandarin">Mandarin</option>
        </select>
      </div>

      <div>
        <label>Summary:</label>
        <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
      </div>

      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div>
        <label>Trailer (Link del navegador de YouTube)</label>
        <input type="text" name="trailer" value={formData.trailer} onChange={handleChange} />
      </div>
      
      <div>
        <label>
          Game File:
          <input 
          type="file" 
          name="game_file" 
          onChange={(event) => {
            setFormData({...formData, game_file: event.target.files[0] })
          }}  
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
export default GameForm