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
    selected: false,
  },
  {
    id: "pasta",
    name: "pasta",
    image: "https://foodish-api.com/images/pasta/pasta2.jpg",
    selected: false,
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

  function handlleShowAddMembers() {
    setShowAddMembers((show) => !show);
  }

  function handleAddMembers(member) {
    setMembers((members) => [...members, member]);
    setShowAddMembers(false);
  }
  return (
    <>
      <header className="header">Dinner Party</header>
      <div className="app">
        <div className="sidebar">
          <InviteList members={initialMembers} />
          <Button onClick={handlleShowAddMembers}>Add Member</Button>
        </div>
        <div>{showAddMembers && <FormAddMember />}</div>
      </div>
      <div className="menu-container">
        <Menu item={foodItems} />
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
          <li>
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
function FormAddMember() {
  return (
    <>
      <form>
        <label>🧑‍🤝‍👩Name</label>
        <input type="text" />
        <label>🖼️ Image URL</label>
        <input type="text" />
        <label>😊Select what to bring</label>
        <select>
          <option>1</option>
        </select>
        <Button>Random</Button>
      </form>

      <Button>Add</Button>
    </>
  );
}
