/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import HomePage from "./HomePage";
import TypeFacePage from "./TypeFacePage";
import ChromaPage from "./ChromaPage";
import ResponsePage from "./ResponsePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "typeface") {
    return <TypeFacePage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "chroma") {
    return <ChromaPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "response") {
    return <ResponsePage onNavigate={setCurrentPage} />;
  }

  return <HomePage onNavigate={setCurrentPage} />;
}

