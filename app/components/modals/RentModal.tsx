"use client";
import dynamic from "next/dynamic";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../shared/Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../shared/CategoryInput";
import { useForm, FieldValues } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () => dynamic(() => import("../shared/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((prev) => {
      if (prev !== STEPS.CATEGORY) {
        return prev - 1;
      }
      return prev;
    });
  };

  const onForward = () => {
    setStep((prev) => {
      if (prev !== STEPS.PRICE) {
        return prev + 1;
      }
      return prev;
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle={"Pack a category"}
        center={false}
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => {
          return (
            <div key={item.label}>
              <CategoryInput
                label={item.label}
                selected={category === item.label ? true : false}
                onClick={(category) => setCustomValue("category", category)}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Where is your place located?"}
          subtitle={"Help guests find you!"}
          center={false}
        ></Heading>
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        ></CountrySelect>
        <Map center={location?.latlng}></Map>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
          center={false}
        ></Heading>
        <Counter
          title={"Guests"}
          subTitle={"How many guests do you allow?"}
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title={"Rooms"}
          subTitle={"How many rooms do you have?"}
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title={"Bathrooms"}
          subTitle={"How many bathrooms do you have?"}
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onForward}
      actionLabel={actionLabel}
      secodaryActionLabel={secondaryLabel}
      secondaryAction={onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
