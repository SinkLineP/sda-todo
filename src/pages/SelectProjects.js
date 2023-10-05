import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAuthorProject } from "../Functions";
import {useSelector} from "react-redux";
import ProjectModal from "../components/ProjectModal/ProjectModal";
import IsAuth from "../hooks/IsAuth";
import styles from "./styles/SelectProject.module.css";

export default function SelectProjects() {
  const navigate = useNavigate();
  const projectsStore = useSelector(state => state.projects);
  const usersStore = useSelector(state => state.auth.users);
  const [show, setShow] = useState(false);


  return (
    <>
      <div className={styles.container}>
        {IsAuth() && (
          <div className={styles.container_create_project}>
            <button className={styles.btn_create_project} onClick={() => setShow(true)}>Добавить проект</button>
          </div>
        )}
        <table className={styles.table}>
          <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={`${styles.number_project} ${styles.th} no-select-text`}>Номер проекта</th>
            <th className={`${styles.title_project} ${styles.th} no-select-text`}>Название проекта</th>
            <th className={`${styles.author_project} ${styles.th} no-select-text`}>Владец проекта</th>
          </tr>
          </thead>
          <tbody className={styles.tbody}>
          {projectsStore.length !== 0 ? projectsStore.map((item, index) => {
            index += 1;

            return (
              <tr className={styles.tr} key={item.id} onClick={() => {
                navigate(`${item.id}`);
              }}>
                <td className={styles.td}>{index}</td>
                <td className={styles.td}>
                  <p>{item.title}</p>
                </td>
                <td className={styles.td}>{getAuthorProject(item.user_id, usersStore)}</td>
              </tr>
            )
          }) : (
            <tr className={styles.tr} id={styles.project_not_found}>
              <td className={styles.td} colSpan={3}>
                <p className={styles.project_not_found_title}>Проектов не найдено</p>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <div>
        <ProjectModal
          onClose={() => setShow(false)}
          show={show}
        />
      </div>
    </>
  )
}