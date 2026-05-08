import { useState } from "react";
import "../styles/statistics.css";

import AnalysisChart from "./AnalysisCharts";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("year");

  return (
    <div className="stats-wrapper">

      {/* ================= TABS ================= */}
      <div className="stats-tabs">
        <button
          className={activeTab === "year" ? "active" : ""}
          onClick={() => setActiveTab("year")}
        >
          Year Wise Statistics (2017 to 2026)
        </button>

        <button
          className={activeTab === "month" ? "active" : ""}
          onClick={() => setActiveTab("month")}
        >
          Month Wise Statistics (2025)
        </button>

        <button
          className={activeTab === "district" ? "active" : ""}
          onClick={() => setActiveTab("district")}
        >
          District Wise Statistics (2017 to 2026)
        </button>

        {/* ✅ NEW 4TH TAB */}
        <button
          className={activeTab === "analysis" ? "active" : ""}
          onClick={() => setActiveTab("analysis")}
        >
          Data Analysis
        </button>
      </div>

      {/* ================= YEAR WISE ================= */}
      {activeTab === "year" && (
        <table className="stats-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Years</th>
              <th>Received</th>
              <th>Approved</th>
              <th>Shortfall</th>
              <th>In Process</th>
              <th>Approved (%)</th>
              <th>Shortfall (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>2017</td><td>15</td><td>15</td><td>0</td><td>0</td><td>100.00</td><td>0.00</td></tr>
            <tr><td>2</td><td>2018</td><td>233</td><td>208</td><td>24</td><td>0</td><td>89.27</td><td>10.30</td></tr>
            <tr><td>3</td><td>2019</td><td>905</td><td>772</td><td>128</td><td>1</td><td>85.30</td><td>14.14</td></tr>
            <tr><td>4</td><td>2020</td><td>871</td><td>729</td><td>142</td><td>0</td><td>83.70</td><td>16.30</td></tr>
            <tr><td>5</td><td>2021</td><td>795</td><td>738</td><td>57</td><td>0</td><td>92.83</td><td>7.17</td></tr>
            <tr><td>6</td><td>2022</td><td>1079</td><td>1010</td><td>67</td><td>2</td><td>93.61</td><td>6.21</td></tr>
            <tr><td>7</td><td>2023</td><td>1154</td><td>1103</td><td>50</td><td>0</td><td>95.58</td><td>4.33</td></tr>
            <tr><td>8</td><td>2024</td><td>928</td><td>875</td><td>53</td><td>0</td><td>94.29</td><td>5.71</td></tr>
            <tr><td>9</td><td>2025</td><td>1110</td><td>824</td><td>236</td><td>50</td><td>74.23</td><td>21.26</td></tr>
            <tr><td>10</td><td>2026</td><td>33</td><td>0</td><td>0</td><td>33</td><td>0.00</td><td>0.00</td></tr>
            <tr className="total-row">
              <td></td>
              <td>TOTAL</td>
              <td>7123</td>
              <td>6274</td>
              <td>757</td>
              <td>86</td>
              <td>88.08</td>
              <td>10.63</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= MONTH WISE ================= */}
      {activeTab === "month" && (
        <table className="stats-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Months</th>
              <th>Received</th>
              <th>Approved</th>
              <th>Shortfall</th>
              <th>Inprocess</th>
              <th>Approved (%)</th>
              <th>Shortfall (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>January</td><td>50</td><td>44</td><td>6</td><td>0</td><td>88.00</td><td>12.00</td></tr>
            <tr><td>2</td><td>February</td><td>63</td><td>54</td><td>9</td><td>0</td><td>85.71</td><td>14.29</td></tr>
            <tr><td>3</td><td>March</td><td>128</td><td>111</td><td>17</td><td>0</td><td>86.72</td><td>13.28</td></tr>
            <tr><td>4</td><td>April</td><td>168</td><td>115</td><td>51</td><td>2</td><td>68.45</td><td>30.36</td></tr>
            <tr><td>5</td><td>May</td><td>75</td><td>66</td><td>8</td><td>1</td><td>88.00</td><td>10.67</td></tr>
            <tr><td>6</td><td>June</td><td>85</td><td>70</td><td>15</td><td>0</td><td>82.35</td><td>17.65</td></tr>
            <tr><td>7</td><td>July</td><td>111</td><td>92</td><td>15</td><td>4</td><td>82.88</td><td>13.51</td></tr>
            <tr><td>8</td><td>August</td><td>88</td><td>76</td><td>10</td><td>2</td><td>86.36</td><td>11.36</td></tr>
            <tr><td>9</td><td>September</td><td>80</td><td>65</td><td>15</td><td>0</td><td>81.25</td><td>18.75</td></tr>
            <tr><td>10</td><td>October</td><td>71</td><td>54</td><td>15</td><td>2</td><td>76.06</td><td>21.13</td></tr>
            <tr><td>11</td><td>November</td><td>92</td><td>47</td><td>38</td><td>7</td><td>51.09</td><td>41.30</td></tr>
            <tr><td>12</td><td>December</td><td>99</td><td>30</td><td>37</td><td>32</td><td>30.30</td><td>37.37</td></tr>
            <tr className="total-row">
              <td></td>
              <td>TOTAL</td>
              <td>1110</td>
              <td>824</td>
              <td>236</td>
              <td>50</td>
              <td>74.23</td>
              <td>21.26</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= DISTRICT WISE ================= */}
      {activeTab === "district" && (
        <table className="stats-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Districts</th>
              <th>Received</th>
              <th>Approved</th>
              <th>Shortfall</th>
              <th>In Process</th>
              <th>Approved (%)</th>
              <th>Shortfall (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>SPR Nellore</td><td>180</td><td>151</td><td>28</td><td>1</td><td>83.89</td><td>15.56</td></tr>
            <tr><td>2</td><td>Ananthapuramu</td><td>84</td><td>73</td><td>9</td><td>2</td><td>86.90</td><td>10.71</td></tr>
            <tr><td>3</td><td>Visakhapatnam</td><td>2025</td><td>1856</td><td>158</td><td>11</td><td>91.65</td><td>7.80</td></tr>
            <tr><td>4</td><td>West Godavari</td><td>360</td><td>300</td><td>57</td><td>3</td><td>83.33</td><td>15.83</td></tr>
            <tr><td>5</td><td>Vizianagaram</td><td>650</td><td>599</td><td>46</td><td>5</td><td>92.15</td><td>7.08</td></tr>
            <tr><td>6</td><td>East Godavari</td><td>1018</td><td>923</td><td>84</td><td>11</td><td>90.67</td><td>8.25</td></tr>
            <tr><td>7</td><td>Guntur</td><td>1122</td><td>942</td><td>159</td><td>16</td><td>83.96</td><td>14.17</td></tr>
            <tr><td>8</td><td>Prakasam</td><td>75</td><td>55</td><td>15</td><td>5</td><td>73.33</td><td>20.00</td></tr>
            <tr><td>9</td><td>Srikakulam</td><td>139</td><td>131</td><td>6</td><td>2</td><td>94.24</td><td>4.32</td></tr>
            <tr><td>10</td><td>Chittoor</td><td>196</td><td>164</td><td>27</td><td>4</td><td>83.67</td><td>13.78</td></tr>
            <tr><td>11</td><td>Kurnool</td><td>128</td><td>116</td><td>11</td><td>1</td><td>90.63</td><td>8.59</td></tr>
            <tr><td>12</td><td>Y.S.R Kadapa</td><td>93</td><td>81</td><td>12</td><td>0</td><td>87.10</td><td>12.90</td></tr>
            <tr><td>13</td><td>Krishna</td><td>1053</td><td>883</td><td>145</td><td>25</td><td>83.86</td><td>13.77</td></tr>

            <tr className="total-row">
              <td></td>
              <td>TOTAL</td>
              <td>7123</td>
              <td>6274</td>
              <td>757</td>
              <td>86</td>
              <td>88.08</td>
              <td>10.63</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ================= DATA ANALYSIS (4TH TAB) ================= */}
      {activeTab === "analysis" && (
        <section className="dashboard-wrapper">

          <div className="dashboard-analysis-box">
            <div className="dashboard-box-header">DATA ANALYSIS</div>

            <div className="dashboard-filters">
              <div>
                Year :
                <select>
                  <option>2026</option>
                </select>
              </div>

              <div>
                Month :
                <select>
                  <option>All</option>
                </select>
              </div>
            </div>

            <h4 className="dashboard-analysis-title">
              STATUS OF PROJECTS, AGENTS AND COMPLAINTS
            </h4>

            <AnalysisChart />
          </div>

         

        </section>
      )}

    </div>
  );
};

export default Statistics;