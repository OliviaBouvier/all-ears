import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

type Professor = {
  name: string;
  rating: number;
  class: string;
  college: string;
  comments: string;
};

const ProfessorList = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const querySnapshot = await getDocs(collection(db, "professors"));
      const usersList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          rating: data.rating,
          class: data.class,
          college: data.college,
          comments: data.comments,
        } as Professor;
      });
      setProfessors(usersList);
    };

    fetchProfessors();
  }, []);

  return (
    <div>
      <h2>Professor List</h2>
      <div>
        {professors.map((professor) => (
          <div>
          <p key={professor.name}>{professor.name}</p>
          <p> {professor.class}</p>
          <p> {professor.college}</p>
          <p>{professor.rating}</p>
          <p>{professor.comments}</p>
          <br></br>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorList;
