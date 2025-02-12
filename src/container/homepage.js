import React from 'react';
import Layout from './layout';



const Metrics = () => {
  return (
    <Layout>
    <div className="container">
      <div className="row">
        {/* Total Revenue */}
        <div className="col">
          <div className="metrix">
            <p>Total Revenue</p>
            <h3>₹7,825</h3>
            <div className="d-flex align-items-end justify-content-between">
              <span className="positive_metrix">22%</span>
              <span><img src="svg/positive_metrix.svg" alt="positive metrix" /></span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col">
          <div className="metrix">
            <p>Total Orders</p>
            <h3>172</h3>
            <div className="d-flex align-items-end justify-content-between">
              <span className="positive_metrix">22%</span>
              <span><img src="svg/positive_metrix.svg" alt="positive metrix" /></span>
            </div>
          </div>
        </div>

        {/* New Restaurant Application */}
        <div className="col">
          <div className="metrix">
            <p>New Restaurant Application</p>
            <h3>76</h3>
            <div className="d-flex align-items-end justify-content-between">
              <span className="positive_metrix">22%</span>
              <span><img src="svg/positive_metrix.svg" alt="positive metrix" /></span>
            </div>
          </div>
        </div>

        {/* Cancellation */}
        <div className="col">
          <div className="metrix">
            <p>Cancellation</p>
            <h3>182</h3>
            <div className="d-flex align-items-end justify-content-between">
              <span className="negative_metrix">22%</span>
              <span><img src="svg/negative_metrix.svg" alt="negative metrix" /></span>
            </div>
          </div>
        </div>

        {/* Refund */}
        <div className="col">
          <div className="metrix">
            <p>Refund</p>
            <h3>₹27,825</h3>
            <div className="d-flex align-items-end justify-content-between">
              <span className="positive_metrix">22%</span>
              <span><img src="svg/positive_metrix.svg" alt="positive metrix" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="row">
        <div className="col-md">
          <div className="form_section">
            <div className="d-flex justify-content-between">
              <h6 className="p-2">Announcements</h6>
              <a>see all</a>
            </div>
            <div className="home_table">
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Announcements 1</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Announcements 2</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Announcements 2</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Announcements 2</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Optimisation Section */}
        <div className="col-md">
          <div className="form_section">
            <div className="d-flex justify-content-between">
              <h6 className="p-2">Store Optimisation</h6>
              <a href="#">see all</a>
            </div>
            <div className="home_table">
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Heading</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
              <div className="home_table">
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Heading</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="home_table">
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Heading</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="home_table">
              <div className="row">
                <div className="col-2">
                  <img className="profile-pic" alt="profile" />
                </div>
                <div className="col">
                  <label>Heading</label>
                  <p>Details</p>
                </div>
                <div className="col-3 home_act">
                  <a href="#"><i className="bi p-1 bi-three-dots"></i></a>
                  <p>1 hour ago</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Customers Section */}
      <div className="row">
        <div className="col">
          <div className="form_section home_bottom">
            <div className="d-flex justify-content-between align-items-end">
              <h6 className="p-2">
                New Customers This Month{' '}
                <span className="positive_garph">
                  <i className="bi bi-graph-up-arrow"></i>2.75%
                </span>
              </h6>
              <p>Join Today</p>
            </div>
            <div className="d-flex justify-content-between">
              <h2>7893</h2>
              <div className="customer_profiles">
                <img className="profile-pic" alt="profile" />
                <img className="profile-pic" alt="profile" />
                <img className="profile-pic" alt="profile" />
                <img className="profile-pic" alt="profile" />
                <img className="profile-pic" alt="profile" />
                <div className="profile-count">27</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Metrics;
