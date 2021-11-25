import {connect} from "react-redux";
import store from "../Redux/Store";
import Feed from "../Views/Feed";

export default connect(Feed)(store.posts)
