import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDayInfo,
  addConsumedProduct,
  deleteConsumedProduct,
} from "../AREDUX/DiaryRedux/diaryOperations";
import { fetchProducts } from "../AREDUX/Products/productOperations";
import { selectProduct } from "../AREDUX/Products/selectors";
import SummaryPanel from "../SummaryPanel/SummaryPanel.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Diary() {
  const dispatch = useDispatch();

  // Selectează produsele disponibile din Redux
  const { items: availableProducts } = useSelector(selectProduct);

  // Selectează starea pentru produsele consumate și rezumat din Redux
  const { consumedProducts, summary, loading, error } = useSelector((state) => state.diary);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState("");
  const [grams, setGrams] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Preia produsele consumate pentru data selectată
  useEffect(() => {
    if (window.location.pathname.includes("diary")) {
      dispatch(fetchDayInfo(new Date(selectedDate).toISOString().slice(0, 10)));
    }
  }, [dispatch, selectedDate]);
  

  // Preia lista completă de produse disponibile (o singură dată)
  useEffect(() => {
    if (window.location.pathname.includes("diary")) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true); // Afișează sugestiile
  };

  const handleSelectSuggestion = (productTitle) => {
    setSearchValue(productTitle);
    setShowSuggestions(false); // Ascunde sugestiile
  };

  const handleAddProduct = () => {
    const formattedDate = new Date(selectedDate).toISOString().slice(0, 10); // Format YYYY-MM-DD
    const selectedProduct = availableProducts.find((p) => p.title === searchValue);

    if (!selectedProduct || grams <= 0) {
      alert("Please select a valid product and enter a valid amount of grams.");
      return;
    }

    const kcalPerGram = selectedProduct.calories / 100 || 0; // Calculează kcal/gram
    const totalKcal = kcalPerGram * grams;

    dispatch(
      addConsumedProduct({
        productId: selectedProduct._id,
        title: selectedProduct.title, // Trimite titlul produsului
        date: formattedDate,
        quantity: grams, // Grame consumate
        totalKcal, // Caloriile calculate
      })
    );

    setSearchValue(""); // Golește input-ul
    setGrams(0); // Resetează gramele
  };

  const handleDeleteProduct = (productId) => {
    const formattedDate = new Date(selectedDate).toISOString().slice(0, 10); // Format YYYY-MM-DD
    dispatch(deleteConsumedProduct({ productId, date: formattedDate }));
  };

  // Filtrează produsele disponibile pentru sugestii
  const filteredProducts = availableProducts.filter((p) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>{selectedDate.toLocaleDateString()}</h2>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />

      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search product..."
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => {
            if (searchValue.length > 0) setShowSuggestions(true); // Afișează sugestiile la focus
          }}
        />
        {showSuggestions && searchValue.length > 0 && filteredProducts.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "38px",
              left: 0,
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 999,
              width: "200px",
            }}
          >
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => handleSelectSuggestion(p.title)}
              >
                {p.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="number"
        placeholder="Enter grams"
        value={grams}
        onChange={(e) => setGrams(Number(e.target.value))}
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <ul>
  {consumedProducts.map((product, index) => (
    <li key={`${product.productId}-${index}`}>
      <span>
        {product.title} - {product.quantity}g - {product.calories.toFixed(0)} kcal
      </span>
      <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
    </li>
  ))}
</ul>


      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <SummaryPanel
  summary={summary || { left: 0, consumed: 0, dailyCalories: 0, percentageOfNormal: 0 }}
  foodNotRecommended={summary.foodNotRecommended || []} 
  selectedDate={selectedDate}
/>
    </div>
  );
}

export default Diary;