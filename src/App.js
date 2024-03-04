import { useState } from "react";

const initialMembers = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    bring: "pizza",
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    bring: "pasta",
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    bring: "",
  },
];

const foodItems = [
  {
    id: "pizza",
    name: "pizza",
    image: "https://foodish-api.com/images/pizza/pizza2.jpg",
    selected: true,
  },
  {
    id: "pasta",
    name: "pasta",
    image: "https://foodish-api.com/images/pasta/pasta2.jpg",
    selected: true,
  },
  {
    id: "burger",
    name: "burger",
    image: "https://foodish-api.com/images/burger/burger5.jpg",
    selected: false,
  },
  {
    id: "desert",
    name: "desert",
    image: "https://foodish-api.com/images/dessert/dessert2.jpg",
    selected: false,
  },
  {
    id: "rice",
    name: "rice",
    image: "https://foodish-api.com/images/rice/rice8.jpg",
    selected: false,
  },
  {
    id: "samosa",
    name: "samosa",
    image: "https://foodish-api.com/images/samosa/samosa2.jpg",
    selected: false,
  },
];

export default function App() {
  const [members, setMembers] = useState(initialMembers);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [food, setFood] = useState(foodItems);

  function handlleShowAddMembers() {
    setShowAddMembers((show) => !show);
  }

  function handleAddMembers(member) {
    setMembers((prevMembers) => [...prevMembers, member]);
    setShowAddMembers(false);
  }

  function handleSelectFood(foodItemID) {
    setFood((prevFoods) =>
      prevFoods.map((food) =>
        food.id === foodItemID ? { ...food, selected: true } : food
      )
    );
  }
  return (
    <>
      <header className="header">Dinner Party</header>
      <div className="app">
        <div className="sidebar">
          <InviteList members={members} />
          <Button onClick={handlleShowAddMembers}>Add Member</Button>
        </div>
        <div>
          {showAddMembers && (
            <FormAddMember
              onAddMember={handleAddMembers}
              members={members}
              food={food}
              onSelectFood={handleSelectFood}
            />
          )}
        </div>
      </div>
      <div className="menu-container">
        <Menu item={food} />
      </div>
    </>
  );
}
function InviteList({ members }) {
  return (
    <>
      <h2>Invite List</h2>
      <ul>
        {members.map((member) => (
          <Member member={member} key={member.id} />
        ))}
      </ul>
    </>
  );
}

function Member({ member }) {
  return (
    <li>
      <img src={member.image} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.bring ? `Bringing: ${member.bring}` : "Undecided"}</p>
    </li>
  );
}
function Menu({ item }) {
  return (
    <>
      <h2>Menu</h2>
      <ul className="menu">
        {item.map((item) => (
          <li className={!item.selected ? "unselected" : ""} key={item.id}>
            <img src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddMember({ members, onAddMember, food, onSelectFood }) {
  const [name, setName] = useState("");
  const [url, setURL] = useState("https://i.pravatar.cc/48");
  const [whatToBring, setWhatToBring] = useState(
    food.filter((item) => !item.selected)[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !url) return;
    const id = crypto.randomUUID();
    const newMember = {
      id,
      name,
      bring: whatToBring.name,
      image: `${url}?=${id}`,
    };
    onAddMember(newMember);
    setName("");
    setURL("https://i.pravatar.cc/48");
    onSelectFood(whatToBring.id);
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🧑‍🤝‍👩Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🖼️ Image URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <label>😊Select what to bring</label>
        <select
          value={whatToBring.id}
          onChange={(e) => setWhatToBring(e.target.value)}
        >
          {food
            .filter((item) => !item.selected)
            .map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
        </select>
        <Button>Add</Button>
      </form>
    </>
  );
}
