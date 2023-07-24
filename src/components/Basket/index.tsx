import { Layout } from "../Layout";
import styles from "./Basket.module.css";
import tests from "../../images/utill/1348934.jpg";
import { Dispatch, FC, SetStateAction, useState } from "react";
import createOrder, { CreateReservationPayload } from "../../store/createOrder";
import { observer } from "mobx-react-lite";
import { ThreeDots } from "react-loader-spinner";

interface IBasket {
  handleClick: Dispatch<SetStateAction<boolean>>;
}

export const Basket: FC<IBasket> = observer(({ handleClick }) => {
  const { loading, fetchCreateOrder } = createOrder;
  const [quantity, setQuantity] = useState<number>(1);

  const sendRequest = () => {
    const payload: CreateReservationPayload = {
      name: "test order 1",
      items: [
        {
          product_id: 1,
          quantity: quantity,
        },
        {
          product_id: 2,
          quantity: 3,
        },
      ],
    };

    fetchCreateOrder(payload);
  };

  return (
    <div className={styles.wrapper}>
      <Layout>
        <div className={styles.content}>
          <h1>Кошик</h1>
          <div className={styles.column}>
            <div className={styles.items}>
              <img src={tests} alt="" />
              <b>Бокс для аксесуарів Guru Fusion 150</b>
              <input
                type="number"
                name=""
                id=""
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <span>шт.</span>
              <p>544,00 грн.</p>
              <i>x</i>
            </div>
          </div>
          <div className={styles.coltroll}>
            <button onClick={() => handleClick(false)}>Продовжити</button>
            {loading ? (
              <div className={styles.loading}>
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              <button onClick={sendRequest}>Оформити</button>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
});
